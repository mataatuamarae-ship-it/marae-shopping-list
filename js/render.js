// Small DOM helpers.
const el = (tag, attrs = {}, children = []) => {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) e.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c === null || c === undefined) return;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return e;
};

const fmtMoney = (n) => {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return '$' + Number(n).toFixed(2);
};

const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
};

function showModal(contentEl) {
  const root = document.getElementById('modal-root');
  root.innerHTML = '';
  const overlay = el('div', { class: 'modal-overlay', onclick: (ev) => { if (ev.target === overlay) closeModal(); } }, [
    el('div', { class: 'modal-box' }, [contentEl])
  ]);
  root.appendChild(overlay);
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}
