const Router = {
  go(route, param) {
    let hash = '#' + route;
    if (param) hash += '/' + encodeURIComponent(param);
    window.location.hash = hash;
  },

  current() {
    const raw = window.location.hash.replace(/^#/, '');
    const [route, param] = raw.split('/');
    return { route: route || 'home', param: param ? decodeURIComponent(param) : null };
  },

  init(onChange) {
    window.addEventListener('hashchange', () => onChange(this.current()));
    onChange(this.current());
  }
};
