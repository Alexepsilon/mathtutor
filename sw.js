// Math Tutor Service Worker v1.0.0
const CACHE_NAME = 'mathtutor-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js'
];

// Install: cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for assets, network-first for API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Cache-first for static assets
  if (ASSETS.some(a => event.request.url.includes(a)) || 
      event.request.url.includes('katex') ||
      event.request.url.endsWith('.html') ||
      event.request.url.endsWith('.css') ||
      event.request.url.endsWith('.js') ||
      event.request.url.endsWith('.png') ||
      event.request.url.endsWith('.json')) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => {
          if (cached) return cached;
          return fetch(event.request)
            .then(response => {
              // Cache successful responses
              if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, clone);
                });
              }
              return response;
            })
            .catch(() => {
              // Return offline page if available
              return caches.match('./index.html');
            });
        })
    );
  }
});
