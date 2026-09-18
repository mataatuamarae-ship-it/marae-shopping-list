// Supabase-backed data store, with a local-cache-first API so the rest of the
// app can keep reading/writing synchronously (like a local list), while
// changes sync to Supabase in the background and other devices' changes
// arrive live via Realtime.
//
// If Supabase can't be reached (offline, or not configured), everything still
// works from the local cache in localStorage; writes queue in an "outbox" and
// flush automatically once the connection comes back.
//
// Local cache shape (same as before):
// { items: [{id, category, name, scaling, baseQty, unitPrice}],
//   events: [{id, name, date, people, days, createdAt,
//             lines: [{id, itemId, name, category, qty, unitPrice, actualPrice, checked}]}] }

const STORAGE_KEY = 'marae_shopping_v1';
const OUTBOX_KEY = 'marae_shopping_outbox_v1';

function uuid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  // fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const dbItem = (it) => ({
  id: it.id, category: it.category, name: it.name, scaling: it.scaling,
  base_qty: it.baseQty, unit_price: it.unitPrice
});
const fromDbItem = (r) => ({
  id: r.id, category: r.category, name: r.name, scaling: r.scaling,
  baseQty: Number(r.base_qty), unitPrice: r.unit_price != null ? Number(r.unit_price) : null
});

const dbEvent = (e) => ({
  id: e.id, name: e.name, event_date: e.date || null, people: e.people, days: e.days
});
const fromDbEvent = (r) => ({
  id: r.id, name: r.name, date: r.event_date, people: r.people, days: r.days,
  createdAt: new Date(r.created_at).getTime(), lines: []
});

const dbLine = (eventId, l) => ({
  id: l.id, event_id: eventId, item_id: l.itemId || null, category: l.category, name: l.name,
  qty: l.qty, unit_price: l.unitPrice, actual_price: l.actualPrice, checked: !!l.checked
});
const fromDbLine = (r) => ({
  id: r.id, itemId: r.item_id, category: r.category, name: r.name,
  qty: Number(r.qty), unitPrice: r.unit_price != null ? Number(r.unit_price) : null,
  actualPrice: r.actual_price != null ? Number(r.actual_price) : null, checked: !!r.checked
});

const Store = {
  _data: null,
  _sb: null,
  _online: true,
  onRemoteChange: null, // set by app.js to trigger a re-render

  // ---------- init ----------
  async init() {
    this._loadLocal();
    this._sb = (window.SUPABASE_URL && window.SUPABASE_ANON_KEY && window.supabase)
      ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY)
      : null;

    if (this._sb) {
      try {
        await this._fetchAllFromSupabase();
        this._online = true;
      } catch (e) {
        console.warn('Could not reach Supabase, using local cache', e);
        this._online = false;
      }
      this._subscribeRealtime();
      window.addEventListener('online', () => this._flushOutbox());
      setInterval(() => this._flushOutbox(), 15000);
    } else {
      this._online = false;
    }
    return this._data;
  },

  isOnline() { return this._online; },
  isConfigured() { return !!this._sb; },

  _loadLocal() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { this._data = JSON.parse(raw); return; } catch (e) { console.error('Corrupt storage, reinitializing', e); }
    }
    this._data = this._initial();
    this._saveLocal();
  },

  _initial() {
    return {
      items: SEED_ITEMS.map((it) => ({
        id: uuid(), category: it.category, name: it.name,
        scaling: it.scaling, baseQty: it.baseQty, unitPrice: it.unitPrice
      })),
      events: []
    };
  },

  _saveLocal() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
  },

  async _fetchAllFromSupabase() {
    const sb = this._sb;
    const [itemsRes, eventsRes, linesRes] = await Promise.all([
      sb.from('shopping_items').select('*').order('category'),
      sb.from('shopping_events').select('*').order('created_at', { ascending: false }),
      sb.from('shopping_event_lines').select('*')
    ]);
    if (itemsRes.error) throw itemsRes.error;
    if (eventsRes.error) throw eventsRes.error;
    if (linesRes.error) throw linesRes.error;

    const items = itemsRes.data.map(fromDbItem);
    const events = eventsRes.data.map(fromDbEvent);
    const byEvent = {};
    events.forEach(e => { byEvent[e.id] = e; });
    linesRes.data.forEach(r => {
      const line = fromDbLine(r);
      const evt = byEvent[r.event_id];
      if (evt) evt.lines.push(line);
    });

    // If Supabase has no items yet (fresh project, migration not run with seed),
    // keep local seed so the app isn't empty.
    this._data = { items: items.length ? items : this._data.items, events };
    this._saveLocal();
  },

  _subscribeRealtime() {
    if (!this._sb) return;
    const debounced = debounce(() => {
      this._fetchAllFromSupabase().then(() => {
        if (this.onRemoteChange) this.onRemoteChange();
      }).catch(() => {});
    }, 400);
    this._sb.channel('shopping-list-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shopping_items' }, debounced)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shopping_events' }, debounced)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shopping_event_lines' }, debounced)
      .subscribe();
  },

  // ---------- outbox (queued writes made while offline) ----------
  _queue(op) {
    const box = JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]');
    box.push(op);
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(box));
  },

  async _flushOutbox() {
    if (!this._sb) return;
    const box = JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]');
    if (box.length === 0) return;
    const remaining = [];
    for (const op of box) {
      try {
        await this._runOp(op);
      } catch (e) {
        remaining.push(op); // keep for next attempt
      }
    }
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(remaining));
    this._online = remaining.length === 0;
    if (remaining.length === 0 && box.length > 0 && this.onRemoteChange) this.onRemoteChange();
  },

  async _runOp(op) {
    const sb = this._sb;
    let res;
    if (op.table === 'shopping_event_lines' && op.op === 'upsert') {
      res = await sb.from(op.table).upsert(op.payload);
    } else if (op.op === 'upsert') {
      res = await sb.from(op.table).upsert(op.payload);
    } else if (op.op === 'delete') {
      res = await sb.from(op.table).delete().eq('id', op.id);
    }
    if (res && res.error) throw res.error;
  },

  // runs a write against Supabase; on failure, queues it for later
  _sync(table, op, payload, id) {
    if (!this._sb) return;
    const record = { table, op, payload, id };
    this._runOp(record).then(() => { this._online = true; }).catch(() => {
      this._online = false;
      this._queue(record);
    });
  },

  // ---------- items ----------
  getItems() { return this._data.items; },

  getCategories() {
    const cats = [];
    this.getItems().forEach(it => { if (!cats.includes(it.category)) cats.push(it.category); });
    return cats;
  },

  addItem(item) {
    item.id = uuid();
    this._data.items.push(item);
    this._saveLocal();
    this._sync('shopping_items', 'upsert', dbItem(item), item.id);
    return item;
  },

  updateItem(id, patch) {
    const it = this._data.items.find(x => x.id === id);
    if (it) Object.assign(it, patch);
    this._saveLocal();
    if (it) this._sync('shopping_items', 'upsert', dbItem(it), id);
  },

  deleteItem(id) {
    this._data.items = this._data.items.filter(x => x.id !== id);
    this._saveLocal();
    this._sync('shopping_items', 'delete', null, id);
  },

  // ---------- events ----------
  getEvents() {
    return this._data.events.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  },

  getEvent(id) { return this._data.events.find(e => e.id === id); },

  addEvent(event) {
    event.id = uuid();
    event.createdAt = Date.now();
    if (!event.lines) event.lines = [];
    event.lines.forEach(l => { if (!l.id) l.id = uuid(); });
    this._data.events.push(event);
    this._saveLocal();
    this._sync('shopping_events', 'upsert', dbEvent(event), event.id);
    event.lines.forEach(l => this._sync('shopping_event_lines', 'upsert', dbLine(event.id, l), l.id));
    return event;
  },

  updateEvent(id, patch) {
    const e = this._data.events.find(x => x.id === id);
    if (!e) return;
    Object.assign(e, patch);
    this._saveLocal();
    this._sync('shopping_events', 'upsert', dbEvent(e), id);
    // patch.lines (used by "rescale") means every line's qty may have changed
    if (patch.lines) {
      e.lines.forEach(l => this._sync('shopping_event_lines', 'upsert', dbLine(id, l), l.id));
    }
  },

  deleteEvent(id) {
    this._data.events = this._data.events.filter(x => x.id !== id);
    this._saveLocal();
    this._sync('shopping_events', 'delete', null, id); // cascades to lines server-side
  },

  updateEventLine(eventId, itemId, patch) {
    const e = this._data.events.find(x => x.id === eventId);
    if (!e) return;
    const line = e.lines.find(l => l.itemId === itemId);
    if (!line) return;
    Object.assign(line, patch);
    this._saveLocal();
    this._sync('shopping_event_lines', 'upsert', dbLine(eventId, line), line.id);
  },

  removeEventLine(eventId, itemId) {
    const e = this._data.events.find(x => x.id === eventId);
    if (!e) return;
    const line = e.lines.find(l => l.itemId === itemId);
    e.lines = e.lines.filter(l => l.itemId !== itemId);
    this._saveLocal();
    if (line) this._sync('shopping_event_lines', 'delete', null, line.id);
  },

  addEventLine(eventId, line) {
    const e = this._data.events.find(x => x.id === eventId);
    if (!e) return;
    line.id = uuid();
    e.lines.push(line);
    this._saveLocal();
    this._sync('shopping_event_lines', 'upsert', dbLine(eventId, line), line.id);
  },

  // ---------- backup / restore (local JSON file, unaffected by Supabase) ----------
  exportJSON() {
    return JSON.stringify(this._data, null, 2);
  },

  importJSON(json, mode) {
    const incoming = JSON.parse(json);
    if (!incoming.items || !incoming.events) throw new Error('Not a valid backup file');
    if (mode === 'replace') {
      this._data = incoming;
    } else {
      const existingItemIds = new Set(this._data.items.map(i => i.id));
      const existingEventIds = new Set(this._data.events.map(e => e.id));
      incoming.items.forEach(i => { if (!existingItemIds.has(i.id)) this._data.items.push(i); });
      incoming.events.forEach(e => { if (!existingEventIds.has(e.id)) this._data.events.push(e); });
    }
    this._saveLocal();
    // push everything imported up to Supabase too
    this._data.items.forEach(it => this._sync('shopping_items', 'upsert', dbItem(it), it.id));
    this._data.events.forEach(e => {
      this._sync('shopping_events', 'upsert', dbEvent(e), e.id);
      e.lines.forEach(l => this._sync('shopping_event_lines', 'upsert', dbLine(e.id, l), l.id));
    });
  },

  resetToSeed() {
    this._data = this._initial();
    this._saveLocal();
    this._data.items.forEach(it => this._sync('shopping_items', 'upsert', dbItem(it), it.id));
  }
};

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
