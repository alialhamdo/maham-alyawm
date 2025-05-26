// اسم التخزين المؤقت
const CACHE_NAME = 'maham-alyawm-v1';

// قائمة الملفات التي سيتم تخزينها مؤقتًا
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/android-icon-192.png',
  '/android-icon-512.png'
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح التخزين المؤقت');
        return cache.addAll(urlsToCache);
      })
  );
});

// استراتيجية التخزين المؤقت: الشبكة أولاً، ثم التخزين المؤقت
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// تحديث التخزين المؤقت عند تحديث Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
