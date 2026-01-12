const cacheName = "DefaultCompany-Kovendhan _ Swetha-1.0";
const contentToCache = [
    "Build/Ecard.loader.js",
    "Build/8b7537d1b96cec3ef602a59a95518e7f.js.br",
    "Build/8ef1f9184eeae2b2c61b0058fabf43aa.data.br",
    "Build/11a545e17c89b8e54c4ed965f480593b.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
