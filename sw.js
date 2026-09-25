// Bump this whenever you change any cached file, so devices pick up the update.
const CACHE_NAME = 'marae-shopping-v3';

// Must all succeed — same-origin files that are always reachable once deployed.
const CORE_PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/config.js',
  './js/seed-data.js',
  './js/seed-recipes.js',
  './js/store.js',
  './js/scaling.js',
  './js/render.js',
  './js/router.js',
  './js/app.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

// Best-effort — external, so a single unreachable/blocked request here must
// never take down the whole install (that would silently kill offline
// support for everything, including the core files above).
const OPTIONAL_PRECACHE_URLS = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_PRECACHE_URLS);
      await Promise.all(OPTIONAL_PRECACHE_URLS.map((url) =>
        cache.add(url).catch((err) => console.warn('Optional precache skipped:', url, err))
      ));
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

// App shell + static assets: cache-first, with a background refresh so
// updates still arrive without breaking offline use. Supabase's own API
// calls (a different host, not in PRECACHE_URLS) are left to the network
// as normal — Store.js already handles those failing gracefully offline.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => cached);

      return cached || networkFetch;
    })
  );
});
