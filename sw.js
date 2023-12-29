self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 如果快取中有資源的副本，則立即提供該資源
      if (response) {
        return response;
      }
      // 否則，發送網絡請求以獲取資源
      return fetch(event.request).then(function (response) {
        // 獲取到最新的資源後，將其添加到快取中
        caches.open("my-cache").then(function (cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    })
  );
});
