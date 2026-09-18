// Simple localStorage-backed data store.
// Data shape:
// { items: [{id, category, name, scaling, baseQty, unitPrice}],
//   events: [{id, name, date, people, days, createdAt, lines: [{itemId, name, category, qty, unitPrice, actualPrice, checked}]}] }

const STORAGE_KEY = 'marae_shopping_v1';

const Store = {
  _data: null,

  load() {
    if (this._data) return this._data;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this._data = JSON.parse(raw);
        return this._data;
      } catch (e) {
        console.error('Corrupt storage, reinitializing', e);
      }
    }
    this._data = this._initial();
    this.save();
    return this._data;
  },

  _initial() {
    return {
      items: SEED_ITEMS.map((it, i) => ({
        id: 'item_' + i + '_' + Date.now(),
        category: it.category,
        name: it.name,
        scaling: it.scaling,
        baseQty: it.baseQty,
        unitPrice: it.unitPrice
      })),
      events: []
    };
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
  },

  getItems() {
    return this.load().items;
  },

  getCategories() {
    const cats = [];
    this.getItems().forEach(it => {
      if (!cats.includes(it.category)) cats.push(it.category);
    });
    return cats;
  },

  addItem(item) {
    const data = this.load();
    item.id = 'item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    data.items.push(item);
    this.save();
    return item;
  },

  updateItem(id, patch) {
    const data = this.load();
    const it = data.items.find(x => x.id === id);
    if (it) Object.assign(it, patch);
    this.save();
  },

  deleteItem(id) {
    const data = this.load();
    data.items = data.items.filter(x => x.id !== id);
    this.save();
  },

  getEvents() {
    return this.load().events.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  },

  getEvent(id) {
    return this.load().events.find(e => e.id === id);
  },

  addEvent(event) {
    const data = this.load();
    event.id = 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    event.createdAt = Date.now();
    data.events.push(event);
    this.save();
    return event;
  },

  updateEvent(id, patch) {
    const data = this.load();
    const e = data.events.find(x => x.id === id);
    if (e) Object.assign(e, patch);
    this.save();
  },

  deleteEvent(id) {
    const data = this.load();
    data.events = data.events.filter(x => x.id !== id);
    this.save();
  },

  updateEventLine(eventId, itemId, patch) {
    const data = this.load();
    const e = data.events.find(x => x.id === eventId);
    if (!e) return;
    const line = e.lines.find(l => l.itemId === itemId);
    if (line) Object.assign(line, patch);
    this.save();
  },

  removeEventLine(eventId, itemId) {
    const data = this.load();
    const e = data.events.find(x => x.id === eventId);
    if (!e) return;
    e.lines = e.lines.filter(l => l.itemId !== itemId);
    this.save();
  },

  addEventLine(eventId, line) {
    const data = this.load();
    const e = data.events.find(x => x.id === eventId);
    if (!e) return;
    e.lines.push(line);
    this.save();
  },

  exportJSON() {
    return JSON.stringify(this.load(), null, 2);
  },

  importJSON(json, mode) {
    const incoming = JSON.parse(json);
    if (!incoming.items || !incoming.events) throw new Error('Not a valid backup file');
    if (mode === 'replace') {
      this._data = incoming;
    } else {
      // merge: incoming items/events added if id not already present
      const data = this.load();
      const existingItemIds = new Set(data.items.map(i => i.id));
      const existingEventIds = new Set(data.events.map(e => e.id));
      incoming.items.forEach(i => { if (!existingItemIds.has(i.id)) data.items.push(i); });
      incoming.events.forEach(e => { if (!existingEventIds.has(e.id)) data.events.push(e); });
    }
    this.save();
  },

  resetToSeed() {
    this._data = this._initial();
    this.save();
  }
};
