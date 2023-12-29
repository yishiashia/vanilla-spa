self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll([
        "/vanilla-spa/index.html",
        "/vanilla-spa/index.js",
        "/vanilla-spa/style.css",
        "/vanilla-spa/9d745a86c141e9aac3cae47d41d9ad77e4ee8aed03f1078ce6e487042c914483.webp",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 如果快取中有資源的副本，則立即提供該資源
      if (response) {
        return response;
      }
      // 否則，發送網絡請求以獲取資源
      return fetch(event.request).then(function (response2) {
        // 獲取到最新的資源後，將其添加到快取中
        caches.open("my-cache").then(function (cache) {
          cache.put(event.request, response2.clone());
        });
        return response2;
      });
    })
  );
});
