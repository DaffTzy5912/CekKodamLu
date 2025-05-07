const CACHE_NAME = 'khodam-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/sw.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Fetch dari cache atau jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
