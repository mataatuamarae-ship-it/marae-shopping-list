const App = document.getElementById('app');

function renderApp(route) {
  App.innerHTML = '';
  if (route.route === 'home') App.appendChild(ViewHome());
  else if (route.route === 'event') App.appendChild(ViewEvent(route.param));
  else if (route.route === 'items') App.appendChild(ViewItems());
  else if (route.route === 'data') App.appendChild(ViewData());
  else App.appendChild(ViewHome());
}

Router.init(renderApp);

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
    el('p', { class: 'text-muted' }, 'Quantities will be scaled automatically from your item list, and you can tweak anything afterwards.'),
    el('div', { class: 'row', style: 'justify-content:flex-end' }, [
      el('button', { class: 'secondary', onclick: closeModal }, 'Cancel'),
      el('button', {
        class: 'primary', onclick: () => {
          const name = nameInput.value.trim() || 'Untitled event';
          const people = parseInt(peopleInput.value, 10) || 1;
          const days = parseInt(daysInput.value, 10) || 1;
          const lines = Scaling.buildLinesForEvent(Store.getItems(), people, days);
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
      el('button', { class: 'secondary', onclick: () => openRescaleModal(evt) }, 'Rescale for new headcount')
    ])
  ]));

  const cats = [];
  evt.lines.forEach(l => { if (!cats.includes(l.category)) cats.push(l.category); });

  cats.forEach(cat => {
    const lines = evt.lines.filter(l => l.category === cat);
    const catChecked = lines.filter(l => l.checked).length;
    const block = el('div', { class: 'category-block' }, [
      el('div', { class: 'category-title' }, [
        el('span', {}, cat),
        el('span', {}, `${catChecked}/${lines.length}`)
      ])
    ]);
    lines.forEach(line => {
      block.appendChild(renderEventLine(evt, line));
    });
    wrap.appendChild(block);
  });

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
      Store.updateEventLine(evt.id, line.itemId, { checked: e.target.checked });
      renderApp(Router.current());
    }
  });
  checkbox.checked = line.checked;
  row.appendChild(checkbox);

  row.appendChild(el('div', { class: 'item-name' }, line.name));

  const qtyInput = el('input', {
    type: 'number', min: '0', value: line.qty,
    onchange: (e) => {
      Store.updateEventLine(evt.id, line.itemId, { qty: parseFloat(e.target.value) || 0 });
      renderApp(Router.current());
    }
  });
  row.appendChild(el('div', { class: 'item-qty-group' }, [qtyInput, el('span', { class: 'text-muted' }, 'qty')]));

  const priceInput = el('input', {
    type: 'number', min: '0', step: '0.01',
    placeholder: line.unitPrice ? (line.unitPrice * line.qty).toFixed(2) : '0.00',
    value: line.actualPrice != null ? line.actualPrice : '',
    onchange: (e) => {
      const v = e.target.value === '' ? null : parseFloat(e.target.value);
      Store.updateEventLine(evt.id, line.itemId, { actualPrice: v });
      renderApp(Router.current());
    }
  });
  row.appendChild(el('div', { class: 'item-price-group' }, [el('span', {}, '$'), priceInput]));

  row.appendChild(el('button', {
    class: 'remove-item-btn no-print', title: 'Remove from this list',
    onclick: () => { Store.removeEventLine(evt.id, line.itemId); renderApp(Router.current()); }
  }, '✕'));

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
  const items = Store.getItems().filter(i => !evt.lines.some(l => l.itemId === i.id));
  const select = el('select', {}, items.map(i => el('option', { value: i.id }, `${i.category} — ${i.name}`)));
  const box = el('div', {}, [
    el('h3', {}, 'Add item to this list'),
    items.length === 0
      ? el('p', { class: 'text-muted' }, 'Every master item is already on this list. Add new items in “Manage Items” first.')
      : el('div', { class: 'field mb8' }, [el('label', {}, 'Item'), select]),
    el('div', { class: 'row', style: 'justify-content:flex-end' }, [
      el('button', { class: 'secondary', onclick: closeModal }, 'Close'),
      items.length > 0 ? el('button', {
        class: 'primary', onclick: () => {
          const master = items.find(i => i.id === select.value);
          const qty = Scaling.suggestedQty(master, evt.people, evt.days);
          Store.addEventLine(evt.id, { itemId: master.id, name: master.name, category: master.category, qty, unitPrice: master.unitPrice, actualPrice: null, checked: false });
          closeModal();
          renderApp(Router.current());
        }
      }, 'Add') : null
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
  wrap.appendChild(el('p', { class: 'text-muted' }, 'This is the template used to build new event lists. "Scales with headcount" items grow with people/days; "fixed" items stay the same unless you edit them on an event.'));

  const cats = Store.getCategories();
  cats.forEach(cat => {
    const items = Store.getItems().filter(i => i.category === cat);
    const block = el('div', { class: 'card' });
    block.appendChild(el('h3', {}, cat));
    const table = el('table', { class: 'manage-table' }, [
      el('tr', {}, [
        el('th', {}, 'Item'), el('th', {}, 'Scaling'), el('th', {}, 'Base qty'), el('th', {}, 'Unit price'), el('th', {}, '')
      ])
    ]);
    items.forEach(it => {
      table.appendChild(el('tr', {}, [
        el('td', {}, it.name),
        el('td', {}, it.scaling === 'per_100_2days' ? 'Scales (per 100 people / 2 days)' : 'Fixed'),
        el('td', {}, String(it.baseQty)),
        el('td', {}, it.unitPrice ? fmtMoney(it.unitPrice) : '—'),
        el('td', {}, [
          el('button', { class: 'icon-btn', title: 'Edit', onclick: () => openItemEditModal(it) }, '✏️'),
          el('button', { class: 'icon-btn', title: 'Delete', onclick: () => { if (confirm(`Delete "${it.name}" from the master list?`)) { Store.deleteItem(it.id); renderApp(Router.current()); } } }, '🗑️')
        ])
      ]));
    });
    block.appendChild(table);
    wrap.appendChild(block);
  });

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
              unitPrice: priceInput.value ? parseFloat(priceInput.value) : null
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
