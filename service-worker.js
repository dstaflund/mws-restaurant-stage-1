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
    '/restaurant.html'
];

self.addEventListener('install', event => {
        event.waitUntil(
            caches.open(cacheName)
                .then(cache => {
                    return cache.addAll(urlsToCache);
                })
        );
    }
);

// navigator.serviceWorker.register('/sw.js')
//     .then(reg => {
//         reg.unregister();
//         reg.update();
//         reg.installing;
//         reg.waiting;
//         reg.active;
// reg.installed
// reg.activating
// reg.activated
// reg.redundant
//
//          reg.addEventListener('updatefound', () => {
//              var sw = reg.installing;
//              console.log(sw.state);
//                 reg.installing.addEventListener('statechange', () => {
//                     if (this.state == 'installed') {
//                         // tjere's an update ready
//                     }
//                 });
//          })'
//
//          navigator.serviceWorker.controller          // service worker that controls this page
// if (! navigator.serviceWorker.controller) {
//     // Page didn't load using service worker
// }

// if (reg.waiting) {
//     // There's an update ready
// }
//
// if (reg.installing) {
//     // There's an update in progress
//
//         reg.installing.addEventListener('statechange', () => {
//             if (this.state == 'installed') {
//                 //there's an update ready
//             }
//         });
// }
//     });

//self.skipWaiting();
//
// // from a page to a service worker
// reg.installing.postMessage({foo: 'bar'});
//
// // in the service worker
// self.addEventListener('message', event => {
//     event.data;
// })
//
// navigator.serviceWorker.addEventListener('controllerchange', () => {
//     //navigator.serviceWorker.controller has changed
// })

self.addEventListener('activate', event => {
        const cacheWhitelist = [cacheName];
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
    }
);

self.addEventListener('fetch', event => {
        event.respondWith(
//            new Response('Hello World!', {
//              headers: { 'foo': 'bar' }
//            });
//
//             fetch('/foo').then(response => {
//
//             }).then(data => {
//                 return response.json();
//             }).then(data => {
//                 console.log(data);
//             }).catch(err => {
//                 console.log(err);
//             })
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request)
                        .then((response) => {
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            const responseToCache = response.clone();
                            caches.open(cacheName)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                            return response;
                        })
                })
        );
    }
);


