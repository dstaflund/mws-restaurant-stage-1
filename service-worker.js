// Adaptation of code found at https://developers.google.com/web/fundamentals/primers/service-workers/
const cacheName = 'assignment-1-cache-v2';
const urlsToCache = [
    '/',
    '/css/restaurant-details.css',
    '/css/restaurant-list.css',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1-750px.jpg',
    '/img/2-750px.jpg',
    '/img/3-750px.jpg',
    '/img/4-750px.jpg',
    '/img/5-750px.jpg',
    '/img/6-750px.jpg',
    '/img/7-750px.jpg',
    '/img/8-750px.jpg',
    '/img/9-750px.jpg',
    '/img/10-750px.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/favicon.ico',
    '/index.html',
    '/restaurant.html',
    '/service-worker.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [ cacheName ];
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

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (! response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(cacheName)
                            .then((cache) => {
                                return cache.put(event.request, responseToCache);
                            });
                    })
                    .catch(err => {
                        console.log('[Error]');
                        console.log(err);
                        return err;
                    })
            })
    );
});




