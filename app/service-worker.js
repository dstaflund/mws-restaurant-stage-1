// Adaptation of service worker code found at https://developers.google.com/web/fundamentals/primers/service-workers/
// Adaptation of IndexedDB code found at https://developers.google.com/web/ilt/pwa/working-with-indexeddb

//"use strict";

/** Name of cache */
const cacheName = 'assignment-1-cache-v1';

/** Files to cache during service worker installation. */
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/images/1-750px.jpg',
    '/images/10-750px.jpg',
    '/images/2-750px.jpg',
    '/images/3-750px.jpg',
    '/images/4-750px.jpg',
    '/images/5-750px.jpg',
    '/images/6-750px.jpg',
    '/images/7-750px.jpg',
    '/images/8-750px.jpg',
    '/images/9-750px.jpg',
    '/images/icons/android-chrome-192x192.png',
    '/images/icons/android-chrome-512x512.png',
    '/images/icons/apple-touch-icon-ipad-76x76.png',
    '/images/icons/apple-touch-icon-ipad-retina-152x152.png',
    '/images/icons/apple-touch-icon-iphone-60x60.png',
    '/images/icons/apple-touch-icon-iphone-retina-120x120.png',
    '/images/icons/baseline-favorite-24px.svg',
    '/images/icons/baseline-favorite_border-24px.svg',
    '/index.html',
    '/manifest.json',
    '/restaurant.html',
    '/robots.txt',
    '/scripts/main_bundle.js',
    '/scripts/restaurant_bundle.js',
    '/styles/restaurant-details.css',
    '/styles/restaurant-list.css',
    '/styles/styles.css'
];

/**
 * Installs service worker and initially populates the cache
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

/**
 * Activates service worker and deletes old caches when necessary
 */
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

/**
 * Fetches and caches requests as follows:
 *
 * - Returns cached responses
 * - Stores successfully fetched basic requests before returning response
 * - Returns all of responses (i.e. CORS and opaque responses, application errors, etc.) without caching them
 * - Logs errors to console before return response
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true})
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (! response || response.status !== 200 || response.type !== 'basic' || response.url.indexOf('socket.io') >= 0) {
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



