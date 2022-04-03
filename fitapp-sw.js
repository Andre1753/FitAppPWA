var cacheName = 'FitApp';

self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/tesi.js',
      '/style.css',
      '/main.js',
      '/assets/delete.png',
      '/assets/edit.png',
      '/assets/plus0.png',
      '/assets/plus1.png',
      '/assets/appicons/favicon.ico',
      '/assets/appicons/android-icon-48x48.png',
      '/assets/appicons/android-icon-72x72.png',
      '/assets/appicons/android-icon-96x96.png',
      '/assets/appicons/android-icon-144x144.png',
      '/assets/appicons/android-icon-192x192.png',
      '/assets/appicons/android-icon-512x512.png'
    ]);
  });
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) { 
  let resposta = caches.open(cacheName).then((cache) => { 
    return cache.match(event.request).then((recurso) => { 
      if (recurso) return recurso; 
      return fetch(event.request).then((recurso) => { 
        cache.put(event.request, recurso.clone()); 
        return recurso; 
      }); 
    }); 
  }); 
  event.respondWith(resposta); 
});