self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/balloons/index.html',
        '/balloons/styles.css',
        '/balloons/script.js',
        '/balloons/icon.png',
        '/balloons/assets/Aylex - Happy Day (freetouse.com).mp3',
        '/balloons/assets/sharp-pop-328170.mp3'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.open('v1').then(async function(cache) {
      const cache_response = await cache.match(e.request);
      if (cache_response) {
        return cache_response;
      }
      else {
        const response = fetch(e.request);
        await cache.put(e.request, (await response).clone());
        return response;
      }
    })
  );
});
