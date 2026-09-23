const App = document.getElementById('app');

function renderApp(route) {
  App.innerHTML = '';
  const isShareRoute = route.route === 'share';
  document.body.classList.toggle('share-mode', isShareRoute);

  if (isShareRoute) App.appendChild(ViewShareEvent(route.param));
  else if (route.route === 'home') App.appendChild(ViewHome());
  else if (route.route === 'event') App.appendChild(ViewEvent(route.param));
  else if (route.route === 'items') App.appendChild(ViewItems());
  else if (route.route === 'recipes') App.appendChild(ViewRecipes());
  else if (route.route === 'data') App.appendChild(ViewData());
  else App.appendChild(ViewHome());

  if (!isShareRoute) updateSyncStatus();
}

// Builds a view-only link to an event's list (same URL, a "share" route
// instead of "event"). No login exists in this app, so this is a convenience
// link, not real access control — anyone who edits the URL's hash could
// still reach the full app. Good enough for sharing the list with whānau
// who just need to see and tick things off.
function shareLinkUrl(evt) {
  return `${location.origin}${location.pathname}#share/${encodeURIComponent(evt.id)}`;
}

function copyShareLink(evt) {
  const url = shareLinkUrl(evt);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => alert('View-only link copied:\n\n' + url))
      .catch(() => prompt('Copy this view-only link:', url));
  } else {
    prompt('Copy this view-only link:', url);
  }
}

// Opens the person's email app with a message already made up — subject and
// body filled in, view-only link included — so all they do is add who it's
// going to and hit send.
function emailShareLink(evt) {
  const url = shareLinkUrl(evt);
  const subject = `Shopping list — ${evt.name}`;
  const body = `Here's the shopping list for ${evt.name} (${evt.people} people · ${evt.days} day${evt.days > 1 ? 's' : ''}).\n\nYou can view it and tick items off as you get them:\n${url}`;
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

function updateSyncStatus() {
  const el = document.getElementById('sync-status');
  if (!el) return;
  if (!Store.isConfigured()) {
    el.textContent = '● Local only';
    el.title = 'Not connected to a shared backend — data stays on this device.';
    el.style.color = '#c9b892';
  } else if (Store.isOnline()) {
    el.textContent = '● Synced';
    el.title = 'Connected — changes sync live with other devices.';
    el.style.color = '#8fd19e';
  } else {
    el.textContent = '● Offline (saved locally)';
    el.title = 'Can’t reach the server right now. Your changes are saved on this device and will sync once you’re back online.';
    el.style.color = '#e0a96d';
  }
}

Store.onRemoteChange = () => renderApp(Router.current());

Store.init().then(() => {
  Router.init(renderApp);
});

// ---------- PWA install + offline caching ----------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => console.warn('Service worker registration failed', err));
  });
}

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('install-btn');
  if (btn) btn.style.display = 'inline-block';
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('install-btn');
  if (btn) {
    btn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      btn.style.display = 'none';
    });
  }
});

window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('install-btn');
  if (btn) btn.style.display = 'none';
});

// ---------- HOME ----------
function ViewHome() {
  const wrap = el('div');
  wrap.appendChild(el('div', { class: 'row between' }, [
    el('h2', {}, 'Shopping events'),
    el('button', { class: 'primary', onclick: openNewEventModal }, '+ New event')
  ]));

  const events = Store.getEvents();
  if (events.length === 0) {
    wrap.appendChild(el('div', { class: 'card empty-state' }, [
      el('p', {}, 'No shopping events yet.'),
      el('button', { class: 'primary', onclick: openNewEventModal }, 'Create your first list')
    ]));
    return wrap;
  }

  const list = el('div');
  events.forEach(evt => {
    const checked = evt.lines.filter(l => l.checked).length;
    const total = evt.lines.length;
    const pct = total ? Math.round((checked / total) * 100) : 0;
    const estTotal = evt.lines.reduce((s, l) => s + (l.actualPrice ?? (l.unitPrice ? l.unitPrice * l.qty : 0)), 0);
    list.appendChild(el('div', { class: 'event-list-item', onclick: () => Router.go('event', evt.id) }, [
      el('div', {}, [
        el('div', { style: 'font-weight:600' }, evt.name),
        el('div', { class: 'meta' }, `${evt.people} people · ${evt.days} day${evt.days > 1 ? 's' : ''} · ${fmtDate(evt.date)}`)
      ]),
      el('div', { class: 'row' }, [
        el('div', {}, [
          el('div', { class: 'text-muted' }, `${checked}/${total} · ${fmtMoney(estTotal)}`),
          el('div', { class: 'progress-bar' }, [el('div', { style: `width:${pct}%` })])
        ])
      ])
    ]));
  });
  wrap.appendChild(list);
  return wrap;
}

function openNewEventModal() {
  const nameInput = el('input', { type: 'text', placeholder: 'e.g. Nan’s Tangi, Labour Weekend Noho', value: '' });
  const dateInput = el('input', { type: 'date', value: new Date().toISOString().slice(0, 10) });
  const peopleInput = el('input', { type: 'number', min: '1', value: '50' });
  const daysInput = el('input', { type: 'number', min: '1', value: '2' });

  const box = el('div', {}, [
    el('h3', {}, 'New shopping event'),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Event name'), nameInput]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Date'), dateInput]),
    el('div', { class: 'row mb8' }, [
      el('div', { class: 'field' }, [el('label', {}, 'Number of people'), peopleInput]),
      el('div', { class: 'field' }, [el('label', {}, 'Number of days'), daysInput])
    ]),
    el('p', { class: 'text-muted' }, `Starts from your default list (${Store.getDefaultListItems().length} of ${Store.getItems().length} master items — change what's included under "Manage Items"), scaled to your headcount/days. You can add more items or tweak anything afterwards.`),
    el('div', { class: 'row', style: 'justify-content:flex-end' }, [
      el('button', { class: 'secondary', onclick: closeModal }, 'Cancel'),
      el('button', {
        class: 'primary', onclick: () => {
          const name = nameInput.value.trim() || 'Untitled event';
          const people = parseInt(peopleInput.value, 10) || 1;
          const days = parseInt(daysInput.value, 10) || 1;
          const lines = Scaling.buildLinesForEvent(Store.getDefaultListItems(), people, days);
          const evt = Store.addEvent({ name, date: dateInput.value, people, days, lines });
          closeModal();
          Router.go('event', evt.id);
        }
      }, 'Create list')
    ])
  ]);
  showModal(box);
}

// ---------- EVENT DETAIL ----------
function ViewEvent(eventId) {
  const evt = Store.getEvent(eventId);
  if (!evt) {
    const wrap = el('div', { class: 'card' }, [
      el('p', {}, 'Event not found.'),
      el('button', { class: 'primary', onclick: () => Router.go('home') }, 'Back to events')
    ]);
    return wrap;
  }

  const wrap = el('div');

  wrap.appendChild(el('div', { class: 'row between no-print' }, [
    el('button', { class: 'secondary', onclick: () => Router.go('home') }, '← All events'),
    el('div', { class: 'row' }, [
      el('button', { class: 'secondary', onclick: () => window.print() }, '🖶️ Print'),
      el('button', { class: 'secondary', onclick: () => openEditEventModal(evt) }, 'Edit details'),
      el('button', { class: 'danger', onclick: () => { if (confirm('Delete this event and its list?')) { Store.deleteEvent(evt.id); Router.go('home'); } } }, 'Delete')
    ])
  ]));

  wrap.appendChild(el('div', { class: 'card' }, [
    el('h2', { class: 'mb8' }, evt.name),
    el('div', { class: 'text-muted' }, `${evt.people} people · ${evt.days} day${evt.days > 1 ? 's' : ''} · ${fmtDate(evt.date)}`),
    el('div', { class: 'row mt8 no-print' }, [
      el('button', { class: 'secondary', onclick: () => openAddItemToEventModal(evt) }, '+ Add item to this list'),
      el('button', { class: 'secondary', onclick: () => openAddRecipeModal(evt) }, '🍲 Add recipe'),
      el('button', { class: 'secondary', onclick: () => openRescaleModal(evt) }, 'Rescale for new headcount'),
      el('button', { class: 'secondary', onclick: () => copyShareLink(evt) }, '🔗 Copy view-only link'),
      el('button', { class: 'secondary', onclick: () => emailShareLink(evt) }, '📧 Email view-only link')
    ])
  ]));

  const searchInput = el('input', { type: 'search', placeholder: '🔍 Search this list…', class: 'no-print', style: 'width:100%; max-width:340px; margin:12px 0;' });
  wrap.appendChild(searchInput);

  const cats = [];
  evt.lines.forEach(l => { if (!cats.includes(l.category)) cats.push(l.category); });

  const catBlocks = []; // { block, rows: [{row, name}] }
  cats.forEach(cat => {
    const lines = evt.lines.filter(l => l.category === cat);
    const catChecked = lines.filter(l => l.checked).length;
    const block = el('div', { class: 'category-block' }, [
      el('div', { class: 'category-title' }, [
        el('span', {}, cat),
        el('span', {}, `${catChecked}/${lines.length}`)
      ])
    ]);
    const rows = [];
    lines.forEach(line => {
      const row = renderEventLine(evt, line);
      block.appendChild(row);
      rows.push({ row, name: line.name });
    });
    wrap.appendChild(block);
    catBlocks.push({ block, rows });
  });

  const applyFilter = () => {
    const q = searchInput.value.trim().toLowerCase();
    catBlocks.forEach(({ block, rows }) => {
      let visibleCount = 0;
      rows.forEach(({ row, name }) => {
        const match = !q || name.toLowerCase().includes(q);
        row.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      block.style.display = visibleCount > 0 ? '' : 'none';
    });
  };
  searchInput.addEventListener('input', applyFilter);

  // totals
  const totalEst = evt.lines.reduce((s, l) => s + (l.actualPrice ?? (l.unitPrice ? l.unitPrice * l.qty : 0)), 0);
  const totalActual = evt.lines.filter(l => l.actualPrice != null).reduce((s, l) => s + l.actualPrice, 0);
  const totalChecked = evt.lines.filter(l => l.checked).length;
  wrap.appendChild(el('div', { class: 'totals-bar' }, [
    el('div', {}, `${totalChecked}/${evt.lines.length} items checked`),
    el('div', {}, ['Actual spend so far: ', el('b', {}, fmtMoney(totalActual))]),
    el('div', {}, ['Estimated total: ', el('b', {}, fmtMoney(totalEst))])
  ]));

  return wrap;
}

function renderEventLine(evt, line) {
  const row = el('div', { class: 'item-row' + (line.checked ? ' checked' : '') });

  const checkbox = el('input', {
    type: 'checkbox',
    onchange: (e) => {
      Store.updateEventLine(evt.id, line.id, { checked: e.target.checked });
      renderApp(Router.current());
    }
  });
  checkbox.checked = line.checked;
  row.appendChild(checkbox);

  row.appendChild(el('div', { class: 'item-name' }, line.name));

  const qtyInput = el('input', {
    type: 'number', min: '0', value: line.qty,
    onchange: (e) => {
      Store.updateEventLine(evt.id, line.id, { qty: parseFloat(e.target.value) || 0 });
      renderApp(Router.current());
    }
  });
  row.appendChild(el('div', { class: 'item-qty-group' }, [qtyInput, el('span', { class: 'text-muted' }, line.unit || 'qty')]));

  const priceInput = el('input', {
    type: 'number', min: '0', step: '0.01',
    placeholder: line.unitPrice ? (line.unitPrice * line.qty).toFixed(2) : '0.00',
    value: line.actualPrice != null ? line.actualPrice : '',
    onchange: (e) => {
      const v = e.target.value === '' ? null : parseFloat(e.target.value);
      Store.updateEventLine(evt.id, line.id, { actualPrice: v });
      renderApp(Router.current());
    }
  });
  row.appendChild(el('div', { class: 'item-price-group' }, [el('span', {}, '$'), priceInput]));

  row.appendChild(el('button', {
    class: 'remove-item-btn no-print', title: 'Remove from this list',
    onclick: () => { Store.removeEventLine(evt.id, line.id); renderApp(Router.current()); }
  }, '✕'));

  return row;
}

// ---------- SHARED (view-only) EVENT ----------
// Same data as ViewEvent, but locked down for whānau who just need to see
// the list and tick things off while shopping: no quantity/price editing,
// no add/remove/rescale/delete, and no nav back into the rest of the app
// (the header itself is hidden in share mode — see index.html/style.css).
function ViewShareEvent(eventId) {
  const evt = Store.getEvent(eventId);
  if (!evt) {
    return el('div', { class: 'card' }, [el('p', {}, 'This list isn’t available (it may have been deleted).')]);
  }

  const wrap = el('div');
  wrap.appendChild(el('div', { class: 'card' }, [
    el('h2', { class: 'mb8' }, evt.name),
    el('div', { class: 'text-muted' }, `${evt.people} people · ${evt.days} day${evt.days > 1 ? 's' : ''} · ${fmtDate(evt.date)}`),
    el('p', { class: 'text-muted mt8' }, 'View-only shopping list — tick items off as you get them.')
  ]));

  const searchInput = el('input', { type: 'search', placeholder: '🔍 Search this list…', style: 'width:100%; max-width:340px; margin:12px 0;' });
  wrap.appendChild(searchInput);

  const cats = [];
  evt.lines.forEach(l => { if (!cats.includes(l.category)) cats.push(l.category); });

  const catBlocks = [];
  cats.forEach(cat => {
    const lines = evt.lines.filter(l => l.category === cat);
    const catChecked = lines.filter(l => l.checked).length;
    const block = el('div', { class: 'category-block' }, [
      el('div', { class: 'category-title' }, [
        el('span', {}, cat),
        el('span', {}, `${catChecked}/${lines.length}`)
      ])
    ]);
    const rows = [];
    lines.forEach(line => {
      const row = renderShareEventLine(evt, line);
      block.appendChild(row);
      rows.push({ row, name: line.name });
    });
    wrap.appendChild(block);
    catBlocks.push({ block, rows });
  });

  const applyFilter = () => {
    const q = searchInput.value.trim().toLowerCase();
    catBlocks.forEach(({ block, rows }) => {
      let visibleCount = 0;
      rows.forEach(({ row, name }) => {
        const match = !q || name.toLowerCase().includes(q);
        row.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      block.style.display = visibleCount > 0 ? '' : 'none';
    });
  };
  searchInput.addEventListener('input', applyFilter);

  const totalChecked = evt.lines.filter(l => l.checked).length;
  wrap.appendChild(el('div', { class: 'totals-bar' }, [
    el('div', {}, `${totalChecked}/${evt.lines.length} items checked`)
  ]));

  return wrap;
}

function renderShareEventLine(evt, line) {
  const row = el('div', { class: 'item-row' + (line.checked ? ' checked' : '') });

  const checkbox = el('input', {
    type: 'checkbox',
    onchange: (e) => {
      Store.updateEventLine(evt.id, line.id, { checked: e.target.checked });
      renderApp(Router.current());
    }
  });
  checkbox.checked = line.checked;
  row.appendChild(checkbox);

  row.appendChild(el('div', { class: 'item-name' }, line.name));
  row.appendChild(el('div', { class: 'item-qty-group' }, [
    el('span', {}, String(line.qty)), el('span', { class: 'text-muted' }, ' ' + (line.unit || ''))
  ]));

  return row;
}

function openEditEventModal(evt) {
  const nameInput = el('input', { type: 'text', value: evt.name });
  const dateInput = el('input', { type: 'date', value: evt.date });
  const peopleInput = el('input', { type: 'number', min: '1', value: evt.people });
  const daysInput = el('input', { type: 'number', min: '1', value: evt.days });
  const box = el('div', {}, [
    el('h3', {}, 'Edit event details'),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Event name'), nameInput]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Date'), dateInput]),
    el('div', { class: 'row mb8' }, [
      el('div', { class: 'field' }, [el('label', {}, 'People'), peopleInput]),
      el('div', { class: 'field' }, [el('label', {}, 'Days'), daysInput])
    ]),
    el('p', { class: 'text-muted' }, 'This only changes the event’s details, not the quantities already on the list. Use “Rescale” to recalculate quantities.'),
    el('div', { class: 'row', style: 'justify-content:flex-end' }, [
      el('button', { class: 'secondary', onclick: closeModal }, 'Cancel'),
      el('button', {
        class: 'primary', onclick: () => {
          Store.updateEvent(evt.id, {
            name: nameInput.value.trim() || evt.name,
            date: dateInput.value,
            people: parseInt(peopleInput.value, 10) || evt.people,
            days: parseInt(daysInput.value, 10) || evt.days
          });
          closeModal();
          renderApp(Router.current());
        }
      }, 'Save')
    ])
  ]);
  showModal(box);
}

function openRescaleModal(evt) {
  const peopleInput = el('input', { type: 'number', min: '1', value: evt.people });
  const daysInput = el('input', { type: 'number', min: '1', value: evt.days });
  const box = el('div', {}, [
    el('h3', {}, 'Rescale quantities'),
    el('p', { class: 'text-muted' }, 'Recalculates every quantity from your master item list for a new headcount/days. Items you’ve already checked keep their checked state; any actual prices you’ve entered are kept.'),
    el('div', { class: 'row mb8' }, [
      el('div', { class: 'field' }, [el('label', {}, 'People'), peopleInput]),
      el('div', { class: 'field' }, [el('label', {}, 'Days'), daysInput])
    ]),
    el('div', { class: 'row', style: 'justify-content:flex-end' }, [
      el('button', { class: 'secondary', onclick: closeModal }, 'Cancel'),
      el('button', {
        class: 'primary', onclick: () => {
          const people = parseInt(peopleInput.value, 10) || evt.people;
          const days = parseInt(daysInput.value, 10) || evt.days;
          const items = Store.getItems();
          const byId = Object.fromEntries(items.map(i => [i.id, i]));
          const newLines = evt.lines.map(line => {
            const master = byId[line.itemId];
            const qty = master ? Scaling.suggestedQty(master, people, days) : line.qty;
            return { ...line, qty };
          });
          Store.updateEvent(evt.id, { people, days, lines: newLines });
          closeModal();
          renderApp(Router.current());
        }
      }, 'Rescale')
    ])
  ]);
  showModal(box);
}

function openAddItemToEventModal(evt) {
  const remaining = Store.getItems().filter(i => !evt.lines.some(l => l.itemId === i.id));
  const cats = [];
  remaining.forEach(i => { if (!cats.includes(i.category)) cats.push(i.category); });
  const checkedIds = new Set();

  const listWrap = el('div', { style: 'max-height:45vh; overflow-y:auto; border:1px solid var(--border); border-radius:8px;' });

  if (remaining.length === 0) {
    listWrap.appendChild(el('p', { class: 'text-muted', style: 'padding:12px' }, 'Every master item is already on this list. Add new items in “Manage Items” first.'));
  }

  const catEntries = []; // { details, summary, catLabel, catItems, labels: [{label, name}] }
  cats.forEach(cat => {
    const catItems = remaining.filter(i => i.category === cat);
    const details = el('details', { open: cats.length <= 3 ? 'open' : null });
    const summary = el('summary', { style: 'padding:8px 12px; cursor:pointer; font-weight:600; background:#f6f1e7;' }, `${cat} (${catItems.length})`);
    details.appendChild(summary);
    const body = el('div', { style: 'padding:4px 12px 8px;' });
    const labels = [];
    catItems.forEach(it => {
      const cb = el('input', {
        type: 'checkbox',
        onchange: (e) => { if (e.target.checked) checkedIds.add(it.id); else checkedIds.delete(it.id); }
      });
      const label = el('label', { style: 'display:flex; align-items:center; gap:8px; padding:5px 0; cursor:pointer;' }, [
        cb, el('span', {}, it.name)
      ]);
      body.appendChild(label);
      labels.push({ label, name: it.name });
    });
    details.appendChild(body);
    listWrap.appendChild(details);
    catEntries.push({ details, summary, cat, labels });
  });

  const searchInput = el('input', { type: 'search', placeholder: '🔍 Search items…', style: 'width:100%; margin-bottom:10px;' });
  const applyFilter = () => {
    const q = searchInput.value.trim().toLowerCase();
    catEntries.forEach(({ details, summary, cat, labels }) => {
      let visibleCount = 0;
      labels.forEach(({ label, name }) => {
        const match = !q || name.toLowerCase().includes(q);
        label.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      details.style.display = visibleCount > 0 ? '' : 'none';
      summary.textContent = `${cat} (${visibleCount})`;
      if (q) details.open = visibleCount > 0;
    });
  };
  searchInput.addEventListener('input', applyFilter);

  const box = el('div', {}, [
    el('h3', {}, 'Add items to this list'),
    el('p', { class: 'text-muted' }, 'Browse by category and tick everything you want to add, or search by name.'),
    remaining.length > 0 ? searchInput : null,
    listWrap,
    el('div', { class: 'row mt16', style: 'justify-content:flex-end' }, [
      el('button', { class: 'secondary', onclick: closeModal }, 'Close'),
      remaining.length > 0 ? el('button', {
        class: 'primary', onclick: () => {
          checkedIds.forEach(id => {
            const master = remaining.find(i => i.id === id);
            if (!master) return;
            const qty = Scaling.suggestedQty(master, evt.people, evt.days);
            Store.addEventLine(evt.id, { itemId: master.id, name: master.name, category: master.category, qty, unitPrice: master.unitPrice, actualPrice: null, checked: false });
          });
          closeModal();
          renderApp(Router.current());
        }
      }, 'Add selected') : null
    ])
  ]);
  showModal(box);
}

// ---------- ADD RECIPE TO EVENT ----------
function openAddRecipeModal(evt) {
  const STANDARD_CATEGORIES = ['Puddings', 'Meals', 'Hangi'];
  const existingCats = Store.getRecipeCategories();
  const cats = [...STANDARD_CATEGORIES, ...existingCats.filter(c => !STANDARD_CATEGORIES.includes(c))];

  function renderCategoryStep() {
    const body = el('div', {}, [
      el('h3', {}, 'Add a recipe’s ingredients'),
      el('p', { class: 'text-muted' }, 'Pick a category, then a recipe. Ingredients scale to this event’s headcount automatically.'),
      el('div', { class: 'row mb8' }, cats.map(cat => {
        const count = Store.getRecipes().filter(r => r.category === cat).length;
        return el('button', {
          class: 'secondary', onclick: () => renderRecipeStep(cat)
        }, `${cat} (${count})`);
      })),
      cats.length === 0 ? el('p', { class: 'text-muted' }, 'No recipes yet — add some under "Recipes" in the header.') : null,
      el('div', { class: 'row', style: 'justify-content:flex-end' }, [
        el('button', { class: 'secondary', onclick: closeModal }, 'Close')
      ])
    ]);
    showModal(body);
  }

  function renderRecipeStep(category) {
    const recipes = Store.getRecipes().filter(r => r.category === category);
    const body = el('div', {}, [
      el('h3', {}, category),
      recipes.length === 0
        ? el('p', { class: 'text-muted' }, `No recipes in "${category}" yet — add one under "Recipes" in the header.`)
        : el('div', {}, recipes.map(r => el('div', {
            class: 'event-list-item', onclick: () => renderPreviewStep(r)
          }, [
            el('div', {}, [
              el('div', { style: 'font-weight:600' }, r.name),
              el('div', { class: 'meta' }, `${r.ingredients.length} ingredients · serves ${r.servings}`)
            ])
          ]))),
      el('div', { class: 'row', style: 'justify-content:space-between; margin-top:8px;' }, [
        el('button', { class: 'secondary', onclick: renderCategoryStep }, '← Categories'),
        el('button', { class: 'secondary', onclick: closeModal }, 'Close')
      ])
    ]);
    showModal(body);
  }

  function renderPreviewStep(recipe) {
    const scaled = Scaling.scaleRecipeIngredients(recipe, evt.people, Store.getItems());
    const cats = [];
    scaled.forEach(ing => { if (!cats.includes(ing.category)) cats.push(ing.category); });
    const body = el('div', {}, [
      el('h3', {}, recipe.name),
      el('p', { class: 'text-muted' }, `Scaled from ${recipe.servings} servings to ${evt.people} people for "${evt.name}" — each ingredient joins its usual column on the list.`),
      el('div', { style: 'max-height:40vh; overflow-y:auto; border:1px solid var(--border); border-radius:8px; padding:4px 12px;' },
        cats.map(cat => el('div', {}, [
          el('div', { style: 'font-weight:600; padding-top:6px;' }, cat),
          ...scaled.filter(i => i.category === cat).map(ing => el('div', { class: 'row between', style: 'padding:5px 0 5px 8px; border-bottom:1px solid var(--border);' }, [
            el('span', {}, ing.name),
            el('span', { class: 'text-muted' }, `${ing.amount} ${ing.unit}`.trim())
          ]))
        ]))
      ),
      el('div', { class: 'row', style: 'justify-content:space-between; margin-top:12px;' }, [
        el('button', { class: 'secondary', onclick: () => renderRecipeStep(recipe.category) }, '← Back'),
        el('button', {
          class: 'primary', onclick: () => {
            Store.addRecipeToEvent(evt.id, recipe, evt.people);
            closeModal();
            renderApp(Router.current());
          }
        }, 'Add ingredients to list')
      ])
    ]);
    showModal(body);
  }

  renderCategoryStep();
}

// ---------- MANAGE RECIPES ----------
function ViewRecipes() {
  const wrap = el('div');
  wrap.appendChild(el('div', { class: 'row between' }, [
    el('h2', {}, 'Recipes'),
    el('button', { class: 'primary', onclick: () => openRecipeEditModal(null) }, '+ Add recipe')
  ]));
  wrap.appendChild(el('p', { class: 'text-muted' }, 'These power the "Add recipe" button on an event — pick Puddings, Meals, Hangi (or any category you add), and the ingredients get scaled to that event’s headcount and added to the list.'));

  const recipes = Store.getRecipes();
  if (recipes.length === 0) {
    wrap.appendChild(el('div', { class: 'card empty-state' }, [
      el('p', {}, 'No recipes yet.'),
      el('button', { class: 'primary', onclick: () => openRecipeEditModal(null) }, 'Add your first recipe')
    ]));
    return wrap;
  }

  const cats = [];
  recipes.forEach(r => { if (!cats.includes(r.category)) cats.push(r.category); });

  cats.forEach(cat => {
    const block = el('div', { class: 'card' });
    block.appendChild(el('h3', {}, cat));
    recipes.filter(r => r.category === cat).forEach(r => {
      block.appendChild(el('div', { class: 'item-row' }, [
        el('div', { class: 'item-name' }, [
          r.name,
          el('div', { class: 'text-muted' }, `serves ${r.servings} · ${r.ingredients.length} ingredients`)
        ]),
        el('button', { class: 'icon-btn', title: 'Edit', onclick: () => openRecipeEditModal(r) }, '✏️'),
        el('button', { class: 'icon-btn', title: 'Delete', onclick: () => { if (confirm(`Delete "${r.name}"?`)) { Store.deleteRecipe(r.id); renderApp(Router.current()); } } }, '🗑️')
      ]));
    });
    wrap.appendChild(block);
  });

  return wrap;
}

function openRecipeEditModal(recipe) {
  const isNew = !recipe;
  const cats = [...new Set(['Puddings', 'Meals', 'Hangi', ...Store.getRecipeCategories()])];
  const nameInput = el('input', { type: 'text', value: recipe ? recipe.name : '' });
  const catSelect = el('select', {}, [
    ...cats.map(c => el('option', { value: c, selected: recipe && recipe.category === c ? 'selected' : null }, c)),
    el('option', { value: '__new__' }, '+ New category…')
  ]);
  const newCatInput = el('input', { type: 'text', placeholder: 'New category name', style: 'display:none;margin-top:6px;' });
  catSelect.addEventListener('change', () => {
    newCatInput.style.display = catSelect.value === '__new__' ? 'block' : 'none';
  });
  const servingsInput = el('input', { type: 'number', min: '1', value: recipe ? recipe.servings : 30 });

  const UNIT_OPTIONS = ['', 'g', 'kg', 'ml', 'l', 'cups', 'tsp', 'tbsp', 'each', 'sheets', 'bunches', 'cloves', 'dozen', 'slab', 'pkt'];

  // Ingredient picker — same columns as "Manage Items" (Item / Qty / Unit
  // price): pick an existing master item (or add a new one on the fly)
  // instead of typing a freehand name, so the ingredient shows a live price
  // and always lands in that item's own category on the shopping list.
  function buildItemOptions(selectedId) {
    const items = Store.getItems();
    const cats = [];
    items.forEach(i => { if (!cats.includes(i.category)) cats.push(i.category); });
    const opts = [el('option', { value: '', disabled: 'disabled', selected: !selectedId ? 'selected' : null }, 'Choose an item…')];
    cats.forEach(cat => {
      opts.push(el('optgroup', { label: cat }, items.filter(i => i.category === cat).map(i =>
        el('option', { value: i.id, selected: selectedId === i.id ? 'selected' : null }, i.name)
      )));
    });
    opts.push(el('option', { value: '__new__' }, '+ Add new item…'));
    return opts;
  }

  const ingredientTable = el('table', { class: 'manage-table' }, [
    el('tr', {}, [el('th', {}, 'Item'), el('th', {}, 'Qty'), el('th', {}, 'Unit price'), el('th', {}, '')])
  ]);
  const rowRefs = [];

  function addIngredientRow(ing) {
    const itemSelect = el('select', { style: 'min-width:150px;' }, buildItemOptions(ing ? ing.itemId : null));
    const newItemName = el('input', { type: 'text', placeholder: 'New item name', style: 'display:none; margin-top:4px; width:100%;' });
    const newItemCat = el('select', { style: 'display:none; margin-top:4px; width:100%;' }, Store.getCategories().map(c => el('option', { value: c }, c)));

    const amountI = el('input', { type: 'number', step: '0.01', min: '0', placeholder: 'Amount', value: ing ? ing.amount : '', style: 'width:65px' });
    const unitI = el('select', { style: 'width:78px' }, UNIT_OPTIONS.map(u =>
      el('option', { value: u, selected: ing && (ing.unit || '') === u ? 'selected' : null }, u || '(no unit)')
    ));

    const priceSpan = el('span', { class: 'text-muted' }, '—');
    function updatePrice() {
      const it = Store.getItems().find(i => i.id === itemSelect.value);
      priceSpan.textContent = it && it.unitPrice ? fmtMoney(it.unitPrice) : '—';
    }
    itemSelect.addEventListener('change', () => {
      const isNew = itemSelect.value === '__new__';
      newItemName.style.display = isNew ? 'block' : 'none';
      newItemCat.style.display = isNew ? 'block' : 'none';
      updatePrice();
    });
    updatePrice();

    const removeBtn = el('button', {
      class: 'remove-item-btn', type: 'button',
      onclick: () => { row.remove(); const idx = rowRefs.indexOf(rowObj); if (idx >= 0) rowRefs.splice(idx, 1); }
    }, '✕');

    const row = el('tr', {}, [
      el('td', {}, [itemSelect, newItemName, newItemCat]),
      el('td', {}, el('div', { class: 'row', style: 'gap:4px; flex-wrap:nowrap;' }, [amountI, unitI])),
      el('td', {}, priceSpan),
      el('td', {}, removeBtn)
    ]);
    const rowObj = { itemSelect, newItemName, newItemCat, amountI, unitI };
    rowRefs.push(rowObj);
    ingredientTable.appendChild(row);
  }

  if (recipe && recipe.ingredients.length) {
    recipe.ingredients.forEach(addIngredientRow);
  } else {
    addIngredientRow();
  }

  const box = el('div', {}, [
    el('h3', {}, isNew ? 'Add recipe' : 'Edit recipe'),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Recipe name'), nameInput]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Recipe category (for browsing under "Add recipe")'), catSelect, newCatInput]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Servings (this recipe as written makes this many)'), servingsInput]),
    el('label', {}, 'Ingredients'),
    el('p', { class: 'text-muted', style: 'margin-top:2px' }, 'Same columns as "Manage Items" — pick the item each ingredient is (or add a new one), how much this recipe uses, and its price comes straight from the master list.'),
    ingredientTable,
    el('button', { class: 'secondary mb8', type: 'button', onclick: () => addIngredientRow() }, '+ Add ingredient'),
    el('div', { class: 'row', style: 'justify-content:space-between' }, [
      !isNew ? el('button', {
        class: 'danger', onclick: () => { if (confirm('Delete this recipe?')) { Store.deleteRecipe(recipe.id); closeModal(); renderApp(Router.current()); } }
      }, 'Delete') : el('span'),
      el('div', { class: 'row' }, [
        el('button', { class: 'secondary', onclick: closeModal }, 'Cancel'),
        el('button', {
          class: 'primary', onclick: () => {
            const category = catSelect.value === '__new__' ? (newCatInput.value.trim() || 'Other') : catSelect.value;
            const ingredients = rowRefs.map(r => {
              let itemId = r.itemSelect.value;
              if (itemId === '__new__') {
                const name = r.newItemName.value.trim();
                if (!name) return null;
                const newItem = Store.addItem({
                  name, category: r.newItemCat.value || 'Other',
                  scaling: 'fixed', baseQty: 0, unitPrice: null, inDefaultList: false
                });
                itemId = newItem.id;
              }
              const amount = parseFloat(r.amountI.value) || 0;
              if (!itemId || amount <= 0) return null;
              return { itemId, amount, unit: r.unitI.value };
            }).filter(Boolean);
            const payload = {
              name: nameInput.value.trim() || 'Untitled recipe',
              category,
              servings: parseInt(servingsInput.value, 10) || 1,
              ingredients
            };
            if (isNew) Store.addRecipe(payload);
            else Store.updateRecipe(recipe.id, payload);
            closeModal();
            renderApp(Router.current());
          }
        }, 'Save')
      ])
    ])
  ]);
  showModal(box);
}

// ---------- MANAGE ITEMS ----------
function ViewItems() {
  const wrap = el('div');
  wrap.appendChild(el('div', { class: 'row between' }, [
    el('h2', {}, 'Manage master item list'),
    el('button', { class: 'primary', onclick: () => openItemEditModal(null) }, '+ Add item')
  ]));
  wrap.appendChild(el('p', { class: 'text-muted' }, 'This is the template used to build new event lists. "Scales with headcount" items grow with people/days; "fixed" items stay the same unless you edit them on an event. Tick "Default list" for items that should be included automatically when you create a new event — leave the rest unticked and add them per-event from the category picker instead.'));

  const defaultCount = Store.getDefaultListItems().length;
  wrap.appendChild(el('p', { class: 'badge' }, `${defaultCount} of ${Store.getItems().length} items in default list`));

  const searchInput = el('input', { type: 'search', placeholder: '🔍 Search items…', style: 'width:100%; max-width:340px; margin-bottom:12px;' });
  wrap.appendChild(searchInput);

  const catBlocks = []; // { block, rows: [{tr, name}] }
  const applyFilter = () => {
    const q = searchInput.value.trim().toLowerCase();
    catBlocks.forEach(({ block, rows }) => {
      let visibleCount = 0;
      rows.forEach(({ tr, name }) => {
        const match = !q || name.toLowerCase().includes(q);
        tr.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      block.style.display = visibleCount > 0 ? '' : 'none';
    });
  };
  searchInput.addEventListener('input', applyFilter);

  const cats = Store.getCategories();
  cats.forEach(cat => {
    const items = Store.getItems().filter(i => i.category === cat);
    const block = el('div', { class: 'card' });
    const rows = [];
    block.appendChild(el('h3', {}, cat));
    const table = el('table', { class: 'manage-table' }, [
      el('tr', {}, [
        el('th', {}, 'Item'), el('th', {}, 'Scaling'), el('th', {}, 'Base qty'), el('th', {}, 'Unit price'),
        el('th', { style: 'text-align:center' }, 'Default list'), el('th', {}, ''), el('th', {}, '')
      ])
    ]);
    items.forEach(it => {
      const defaultCb = el('input', {
        type: 'checkbox',
        onchange: (e) => { Store.updateItem(it.id, { inDefaultList: e.target.checked }); renderApp(Router.current()); }
      });
      defaultCb.checked = it.inDefaultList !== false;
      const tr = el('tr', {}, [
        el('td', {}, it.name),
        el('td', {}, it.scaling === 'per_100_2days' ? 'Scales (per 100 people / 2 days)' : 'Fixed'),
        el('td', {}, String(it.baseQty)),
        el('td', {}, it.unitPrice ? fmtMoney(it.unitPrice) : '—'),
        el('td', { style: 'text-align:center' }, defaultCb),
        el('td', {}, it.paknsaveUrl
          ? el('a', { href: it.paknsaveUrl, target: '_blank', rel: 'noopener', class: 'icon-btn', title: 'View on PAK’nSAVE' }, '🛒')
          : ''),
        el('td', {}, [
          el('button', { class: 'icon-btn', title: 'Edit', onclick: () => openItemEditModal(it) }, '✏️'),
          el('button', { class: 'icon-btn', title: 'Delete', onclick: () => { if (confirm(`Delete "${it.name}" from the master list?`)) { Store.deleteItem(it.id); renderApp(Router.current()); } } }, '🗑️')
        ])
      ]);
      table.appendChild(tr);
      rows.push({ tr, name: it.name });
    });
    block.appendChild(table);
    wrap.appendChild(block);
    catBlocks.push({ block, rows });
  });

  applyFilter();
  return wrap;
}

function openItemEditModal(item) {
  const isNew = !item;
  const cats = Store.getCategories();
  const nameInput = el('input', { type: 'text', value: item ? item.name : '' });
  const catSelect = el('select', {}, [
    ...cats.map(c => el('option', { value: c, selected: item && item.category === c ? 'selected' : null }, c)),
    el('option', { value: '__new__' }, '+ New category…')
  ]);
  const newCatInput = el('input', { type: 'text', placeholder: 'New category name', style: 'display:none;margin-top:6px;' });
  catSelect.addEventListener('change', () => {
    newCatInput.style.display = catSelect.value === '__new__' ? 'block' : 'none';
  });
  const scalingSelect = el('select', {}, [
    el('option', { value: 'per_100_2days', selected: (!item || item.scaling === 'per_100_2days') ? 'selected' : null }, 'Scales with headcount (per 100 people / 2 days)'),
    el('option', { value: 'fixed', selected: (item && item.scaling === 'fixed') ? 'selected' : null }, 'Fixed quantity')
  ]);
  const baseQtyInput = el('input', { type: 'number', min: '0', step: '0.5', value: item ? item.baseQty : 1 });
  const priceInput = el('input', { type: 'number', min: '0', step: '0.01', value: item && item.unitPrice ? item.unitPrice : '' });
  const paknsaveUrlInput = el('input', { type: 'url', placeholder: 'https://www.paknsave.co.nz/shop/product/...', value: item && item.paknsaveUrl ? item.paknsaveUrl : '' });
  const defaultListCb = el('input', { type: 'checkbox' });
  defaultListCb.checked = !item || item.inDefaultList !== false;

  const box = el('div', {}, [
    el('h3', {}, isNew ? 'Add item' : 'Edit item'),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Item name'), nameInput]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Category'), catSelect, newCatInput]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Scaling'), scalingSelect]),
    el('div', { class: 'field mb8' }, [
      el('label', {}, 'Base quantity (at 100 people / 2 days if scaling, otherwise the fixed amount)'),
      baseQtyInput
    ]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'Unit price ($, optional — used to estimate cost)'), priceInput]),
    el('div', { class: 'field mb8' }, [el('label', {}, 'PAK’nSAVE link (optional)'), paknsaveUrlInput]),
    el('label', { class: 'row mb8', style: 'align-items:center; gap:8px; cursor:pointer;' }, [
      defaultListCb, el('span', {}, 'Include in default list (added automatically to new events)')
    ]),
    el('div', { class: 'row', style: 'justify-content:space-between' }, [
      !isNew ? el('button', {
        class: 'danger', onclick: () => { if (confirm('Delete this item?')) { Store.deleteItem(item.id); closeModal(); renderApp(Router.current()); } }
      }, 'Delete') : el('span'),
      el('div', { class: 'row' }, [
        el('button', { class: 'secondary', onclick: closeModal }, 'Cancel'),
        el('button', {
          class: 'primary', onclick: () => {
            const category = catSelect.value === '__new__' ? (newCatInput.value.trim() || 'Other') : catSelect.value;
            const payload = {
              name: nameInput.value.trim() || 'Untitled item',
              category,
              scaling: scalingSelect.value,
              baseQty: parseFloat(baseQtyInput.value) || 0,
              unitPrice: priceInput.value ? parseFloat(priceInput.value) : null,
              paknsaveUrl: paknsaveUrlInput.value.trim() || null,
              inDefaultList: defaultListCb.checked
            };
            if (isNew) Store.addItem(payload);
            else Store.updateItem(item.id, payload);
            closeModal();
            renderApp(Router.current());
          }
        }, 'Save')
      ])
    ])
  ]);
  showModal(box);
}

// ---------- DATA / BACKUP ----------
function ViewData() {
  const wrap = el('div');
  wrap.appendChild(el('h2', {}, 'Backup & share'));
  wrap.appendChild(el('div', { class: 'card' }, [
    el('h3', {}, 'Export'),
    el('p', { class: 'text-muted' }, 'Download a backup of your item list and all shopping events. Send this file to someone else to share your data with them, or keep it safe in case you clear your browser.'),
    el('button', { class: 'primary', onclick: doExport }, '⬇️ Download backup (.json)')
  ]));
  wrap.appendChild(el('div', { class: 'card' }, [
    el('h3', {}, 'Import'),
    el('p', { class: 'text-muted' }, 'Load a backup file someone sent you, or restore your own. "Merge" adds anything new without touching what you already have; "Replace" wipes this device’s data first.'),
    (() => {
      const fileInput = el('input', { type: 'file', accept: '.json,application/json' });
      const modeSelect = el('select', {}, [
        el('option', { value: 'merge' }, 'Merge with existing data'),
        el('option', { value: 'replace' }, 'Replace all existing data')
      ]);
      const status = el('div', { class: 'text-muted mt8' });
      const doImport = () => {
        const f = fileInput.files[0];
        if (!f) { status.textContent = 'Choose a file first.'; return; }
        const reader = new FileReader();
        reader.onload = () => {
          try {
            Store.importJSON(reader.result, modeSelect.value);
            status.textContent = 'Imported successfully.';
            renderApp(Router.current());
          } catch (e) {
            status.textContent = 'Could not import: ' + e.message;
          }
        };
        reader.readAsText(f);
      };
      return el('div', {}, [
        el('div', { class: 'field mb8' }, [el('label', {}, 'Backup file'), fileInput]),
        el('div', { class: 'field mb8' }, [el('label', {}, 'Mode'), modeSelect]),
        el('button', { class: 'primary', onclick: doImport }, 'Import'),
        status
      ]);
    })()
  ]));
  wrap.appendChild(el('div', { class: 'card' }, [
    el('h3', {}, 'Reset'),
    el('p', { class: 'text-muted' }, 'Wipe this device’s data and start again from the original template.'),
    el('button', { class: 'danger', onclick: () => { if (confirm('This deletes all items and events on this device. Continue?')) { Store.resetToSeed(); renderApp(Router.current()); } } }, 'Reset to template')
  ]));
  wrap.appendChild(el('p', { class: 'text-muted' }, 'Note: this app stores data only on this device’s browser. To keep several people’s devices in sync live, this will need a shared backend later — for now, export/import is the way to hand a list to someone else.'));
  return wrap;
}

function doExport() {
  const blob = new Blob([Store.exportJSON()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = el('a', { href: url, download: `marae-shopping-backup-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
