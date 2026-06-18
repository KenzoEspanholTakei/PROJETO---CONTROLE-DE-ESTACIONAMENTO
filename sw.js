const CACHE_NAME = 'estacionamento-v1';
const ASSETS_TO_CACHE = [
  '/',
  './',
  './index.html',
  './js/app.js',
  './js/Model.js',
  './js/View.js',
  './js/Controller.js',
  './manifest.json',
  './icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna a resposta do cache, se existir, senão busca na rede
        return response || fetch(event.request);
      })
  );
});
