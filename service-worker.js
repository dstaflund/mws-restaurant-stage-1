// Adaptation of service worker code found at https://developers.google.com/web/fundamentals/primers/service-workers/
// Adaptation of IndexedDB code found at https://developers.google.com/web/ilt/pwa/working-with-indexeddb

"use strict";

import { openDB, deleteDB, wrap, unwrap } from 'idb';


/** Name of cache */
const cacheName = 'assignment-1-cache-v1';

/** Files to cache during service worker installation. */
const urlsToCache = [
    '/',
    '/styles/restaurant-details.scss',
    '/styles/restaurant-list.scss',
    '/styles/styles.scss',
    '/images/1-750px.jpg',
    '/images/2-750px.jpg',
    '/images/3-750px.jpg',
    '/images/4-750px.jpg',
    '/images/5-750px.jpg',
    '/images/6-750px.jpg',
    '/images/7-750px.jpg',
    '/images/8-750px.jpg',
    '/images/9-750px.jpg',
    '/images/10-750px.jpg',
    '/scripts/dbhelper.js',
    '/scripts/main.js',
    '/scripts/restaurant_info.js',
    '/favicon.ico',
    '/index.html',
    '/restaurant.html',
    '/service-worker.js'
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




