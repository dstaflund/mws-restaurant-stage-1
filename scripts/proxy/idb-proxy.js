const dbName = 'mws-restaurant-db';
const dbVersion = 1;

const restaurantStore = "restaurants";
const neighborhoodIndex = "neighborhood";
const cuisineIndex = "cuisine_type";
const neighborhoodCuisineIndex = "neighborhood_cuisine_type";

const imageDetailsStore = "image-details";


/**
 * I would prefer to fetch this information from the server, but I am told we're not to
 * modify the server for Project 2.  So I'm going to store it in the database.
 */
const imageDetails = [
    {
        "photograph": 1,
        "description": "Diners inside Mission Chinese Food",
        "images": [
            { "name": "1-250px.jpg", "width":  "250", "density": "1" },
            { "name": "1-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "1-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "1-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "1-500px.jpg", "width":  "500", "density": "2" },
            { "name": "1-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "1-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "1-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "1-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 2,
        "description": "Emily's Freshly made pizza",
        "images": [
            { "name": "2-250px.jpg", "width":  "250", "density": "1" },
            { "name": "2-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "2-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "2-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "2-500px.jpg", "width":  "500", "density": "2" },
            { "name": "2-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "2-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "2-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "2-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 3,
        "description": "Kang Ho Dong Baekjeong seating area",
        "images": [
            { "name": "3-250px.jpg", "width":  "250", "density": "1" },
            { "name": "3-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "3-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "3-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "3-500px.jpg", "width":  "500", "density": "2" },
            { "name": "3-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "3-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "3-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "3-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 4,
        "description": "Katz's Delicatessen storefront",
        "images": [
            { "name": "4-250px.jpg", "width":  "250", "density": "1" },
            { "name": "4-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "4-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "4-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "4-500px.jpg", "width":  "500", "density": "2" },
            { "name": "4-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "4-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "4-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "4-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 5,
        "description": "Diners and staff inside Roberta's Pizza",
        "images": [
            { "name": "5-250px.jpg", "width":  "250", "density": "1" },
            { "name": "5-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "5-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "5-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "5-500px.jpg", "width":  "500", "density": "2" },
            { "name": "5-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "5-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "5-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "5-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 6,
        "description": "Diners inside Hometown BBQ",
        "images": [
            { "name": "6-250px.jpg", "width":  "250", "density": "1" },
            { "name": "6-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "6-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "6-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "6-500px.jpg", "width":  "500", "density": "2" },
            { "name": "6-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "6-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "6-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "6-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 7,
        "description": "Superiority Burger's storefront",
        "images": [
            { "name": "7-250px.jpg", "width":  "250", "density": "1" },
            { "name": "7-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "7-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "7-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "7-500px.jpg", "width":  "500", "density": "2" },
            { "name": "7-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "7-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "7-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "7-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 8,
        "description": "The Dutch's storefront",
        "images": [
            { "name": "8-250px.jpg", "width":  "250", "density": "1" },
            { "name": "8-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "8-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "8-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "8-500px.jpg", "width":  "500", "density": "2" },
            { "name": "8-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "8-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "8-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "8-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 9,
        "description": "Diners inside Mu Ramen",
        "images": [
            { "name": "9-250px.jpg", "width":  "250", "density": "1" },
            { "name": "9-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "9-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "9-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "9-500px.jpg", "width":  "500", "density": "2" },
            { "name": "9-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "9-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "9-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "9-750px.jpg", "width":  "750", "density": "3" }
        ]
    },
    {
        "photograph": 10,
        "description": "Casa Enrique's seating area",
        "images": [
            { "name": "10-250px.jpg", "width":  "250", "density": "1" },
            { "name": "10-331px.jpg", "width":  "331", "density": "1.324" },
            { "name": "10-375px.jpg", "width":  "375", "density": "1.5" },
            { "name": "10-425px.jpg", "width":  "425", "density": "1.7" },
            { "name": "10-500px.jpg", "width":  "500", "density": "2" },
            { "name": "10-583px.jpg", "width":  "583", "density": "2.33" },
            { "name": "10-600px.jpg", "width":  "600", "density": "2.4" },
            { "name": "10-628px.jpg", "width":  "628", "density": "2.51" },
            { "name": "10-750px.jpg", "width":  "750", "density": "3" }
        ]
    }
];


/**
 * This class contains all IndexedDB-related code
 */
class IdbProxy {
    static _instance;

    static get instance() {
        console.log('[idb-proxy - instance]');
        return new Promise((resolve, reject) => {
            if (! IdbProxy._instance) {
                IdbProxy._instance = new IdbProxy();
                IdbProxy._instance.initialize()
                    .then(() => resolve(IdbProxy._instance))
                    .catch(error => reject(error));
            }
            resolve(IdbProxy._instance);
        });
    }

    _db;

    constructor(){
    }

    initialize(){
        console.log('[idb-proxy - initialize]');
        return new Promise((resolve, reject) => {
            this.openDatabase()
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }

    openDatabase() {
        console.log('[idb-proxy - openDatabase]');
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbName, dbVersion);
            request.onerror = error => reject(error);
            request.onsuccess = () => {
                console.log('[idb-proxy - openDatabase#onsuccess]');
                console.log(request.result);
                this._db = request.result;
                console.log(this._db);
                console.log('[! idb-proxy - openDatabase]');
                resolve();
            };
            request.onupgradeneeded = event => {
                console.log('[idb-proxy - openDatabase#onupgradeneeded]');
                console.log(event);
                console.log(event.result);
                this._db = event.result;
                console.log(this._db);
                this.createRestaurantsStore()
                    .then(() => this.createImageDetailsStore())
                    .catch(error => reject(error));
                console.log('[! idb-proxy - openDatabase]');
                resolve();
            };
        });
    }

    createRestaurantsStore(){
        console.log('[idb-proxy - createRestaurantStore]');
        return new Promise((resolve, reject) => {
            const store = this._db.createObjectStore(restaurantStore, { keyPath: "id" });
            store.onerror = error => reject(error);

            store.createIndex(neighborhoodIndex, "neighborhood", { unique: false });
            store.createIndex(cuisineIndex, "cuisine_type", { unique: false });
            store.createIndex(
                neighborhoodCuisineIndex,
                "neighborhood, cuisine_type",
                { unique: false, multiEntry: true }
            );
            resolve();
        });
    }

    createImageDetailsStore(){
        console.log('[idb-proxy - createImageDetailsStore]');
        return new Promise((resolve, reject) => {
            const store = this._db.createObjectStore(imageDetailsStore, { keyPath: "photograph" });
            store.transaction.onerror = error => reject(error);
            store.transaction.oncomplete = () => {
                const store2 = this._db.transaction(imageDetailsStore, "readwrite").objectStore(imageDetailsStore);
                store2.onerror = error => reject(error);
                store2.onsuccess = () => {
                    imageDetails.forEach(imageDetail => {
                        const request = store.add(imageDetail);
                        request.onerror = error => reject(error);
                    });
                };
                resolve();
            };
        });
    }

    getRestaurants() {
        console.log('[idb-proxy - getRestaurants]');
        return new Promise((resolve, reject) => {
            const store = this._db.transaction(restaurantStore).objectStore(restaurantStore);
            store.onerror = error => reject(error);
            store.onsuccess = () => this.getCursorValues(store)
                .then(restaurants => resolve(restaurants))
                .catch(error => reject(error));
        });
    }

    getRestaurantsByNeighborhood(neighborhood) {
        console.log('[idb-proxy - getRestaurantsByNeighborhood]');
        return new Promise((resolve, reject) => {
            const index = this._db
                .transaction(restaurantStore)
                .objectStore(restaurantStore)
                .index(neighborhoodIndex)
                .get(neighborhood);
            index.onerror = error => reject(error);
            index.onsuccess = () => this.getCursorValues(index)
                .then(restaurants => resolve(restaurants))
                .catch(error => reject(error));
        });
    }

    getRestaurantsByCuisineType(cuisineType) {
        console.log('[idb-proxy - getRestaurantsByCuisineType]');
        return new Promise((resolve, reject) => {
            const index = this._db
                .transaction(restaurantStore)
                .objectStore(restaurantStore)
                .index(cuisineIndex)
                .get(cuisineType);
            index.onerror = error => reject(error);
            index.onsuccess = () => this.getCursorValues(index)
                .then(restaurants => resolve(restaurants))
                .catch(error => reject(error));
        });
    }

    getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood) {
        console.log('[idb-proxy - getRestaurantsByCuisineTypeAndNeighborhood]');
        return new Promise((resolve, reject) => {
            const index = this._db
                .transaction(restaurantStore)
                .objectStore(restaurantStore)
                .index(neighborhoodCuisineIndex)
                .get([cuisineType, neighborhood]);
            index.onerror = error => reject(error);
            index.onsuccess = () => this.getCursorValues(index)
                .then(restaurants => resolve(restaurants))
                .catch(error => reject(error));
        });
    }

    getRestaurant(id) {
        console.log('[idb-proxy - getRestaurant]');
        return new Promise((resolve, reject) => {
            const request = this._db.transaction(restaurantStore).objectStore(restaurantStore).get(id);
            request.onerror = error => reject(error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    saveRestaurants(restaurants) {
        console.log('[idb-proxy - saveRestaurants]');
        return new Promise((resolve, reject) => {
            const store = this._db.transaction(restaurantStore, "readwrite").objectStore(restaurantStore);
            store.onerror = error => reject(error);
            restaurants.forEach(restaurant => {
                const request = store.add(restaurant);
                request.onerror = error => reject(error);
            });
            resolve();
        });
    }

    saveRestaurant(restaurant) {
        console.log('[idb-proxy - saveRestaurant]');
        return new Promise((resolve, reject) => {
            const request = this._db
                .transaction(restaurantStore, "readwrite")
                .objectStore(restaurantStore)
                .add(restaurant);
            request.onerror = error => reject(error);
            request.onsuccess = () => resolve();
        });
    }

    getImageDetails(photograph){
        console.log('[idb-proxy - getImageDetails]');
        return new Promise((resolve, reject) => {
            const request = this._db.transaction(imageDetailsStore).objectStore(imageDetailsStore).get(photograph);
            request.onerror = error => reject(error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    getNeighborhoods() {
        console.log('[idb-proxy - getNeighborhoods]');
        return new Promise((resolve, reject) => {
            const index = this._db
                .transaction(restaurantStore)
                .objectStore(restaurantStore)
                .index(neighborhoodIndex)
                .getAllKeys();
            index.onerror = error => reject(error);
            index.onsuccess = () => this.getCursorValues(index)
                .then(neighborhoods => resolve(neighborhoods))
                .catch(error => reject(error));
        });
    }

    getCuisines() {
        console.log('[idb-proxy - getCuisines]');
        return new Promise((resolve, reject) => {
            const index = this._db
                .transaction(restaurantStore)
                .objectStore(restaurantStore)
                .index(cuisineIndex)
                .getAllKeys();
            index.onerror = error => reject(error);
            index.onsuccess = () => this.getCursorValues(index)
                .then(cuisines => resolve(cuisines))
                .catch(error => reject(error));
        });
    }

    getCursorValues(request) {
        console.log('[idb-proxy - getCursorValues]');
        return new Promise((resolve, reject) => {
            const cursor = request.openCursor();
            cursor.onerror = event => reject(event);
            cursor.onSuccess = event => {
                let values = [];
                const cursor = event.target.result;
                if (cursor) {
                    values.push(cursor.value);
                    cursor.continue();
                }
                resolve(values);
            };
        });
    }
}


