// The following is an adaptation of https://github.com/mdn/to-do-notifications/blob/gh-pages/scripts/todo.js
// The following is an adaptation of https://googlechrome.github.io/samples/idb-getall/

const dbName = 'mws-restaurant-db';
const dbVersion = 1;

const restaurantStoreName = "restaurants";
const neighborhoodIndex = "neighborhood";
const cuisineIndex = "cuisine_type";
const neighborhoodCuisineIndex = "neighborhood_cuisine_type";

const imageDetailsStoreName = "image-details";

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


window.onload = () => {

  // Initialize necessary indexedDb references depending on browser implementation
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  // Initialize and open the database
  let db;
  const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
  dbOpenRequest.onsuccess = () => {
    db = dbOpenRequest.result;
  };


  /**
   * Create the database if it doesn't yet exist
   */
  dbOpenRequest.onupgradeneeded = event => {
    db = event.target.result;

    // Create an initial store for our restaurants
    const neighborhoodStore = db.createObjectStore(restaurantStoreName, { keyPath: "id" });
    neighborhoodStore.createIndex(neighborhoodIndex, "neighborhood", { unique: false });
    neighborhoodStore.createIndex(cuisineIndex, "cuisine_type", { unique: false });
    neighborhoodStore.createIndex(
      neighborhoodCuisineIndex,
      [ "neighborhood", "cuisine_type" ],
      { unique: false, multiEntry: true }
    );

    // Create and populate a second store for our image details
    const imageDetailsStore = db.createObjectStore(imageDetailsStoreName, { keyPath: "photograph" });
    imageDetailsStore.transaction.oncomplete = () => {
      const transaction = db.transaction(imageDetailsStoreName, "readwrite");
      const store = transaction.objectStore(imageDetailsStoreName);
      imageDetails.forEach(imageDetail => store.add(imageDetail));
    };
  };
};


class DataProvider {


  /**
   * Fetch all restaurants.
   */
  static getRestaurants(callback) {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, 'readonly');
      const store = transaction.objectStore(restaurantStoreName);
      const request = store.openCursor();
      request.onsuccess = event => {
        let results = [];
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();            // This looping syntax is #$%^&'ing bizarre
        }
        callback(null, results);
      };
    };
  }

  /**
   * Get all restaurants in a given neighbourhood
   */
  static getRestaurantsByNeighborhood(neighborhood, callback) {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, 'readonly');
      const store = transaction.objectStore(restaurantStoreName);
      const index = store.index(neighborhoodIndex);
      const request = index.get(neighborhood).openCursor();
      request.onsuccess = event => {
        let results = [];
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();            // This looping syntax is #$%^&'ing bizarre
        }
        callback(null, results);
      };
    }
  }

  /**
   * Get all restaurants known for a given cuisine type
   */
  static getRestaurantsByCuisineType(cuisineType, callback) {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, 'readonly');
      const store = transaction.objectStore(restaurantStoreName);
      const index = store.index(cuisineIndex);
      const request = index.get(cuisineType).openCursor();
      request.onsuccess = event => {
        let results = [];
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();            // This looping syntax is #$%^&'ing bizarre
        }
        callback(null, results);
      };
    }
  }


  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood, callback) {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, 'readonly');
      const store = transaction.objectStore(restaurantStoreName);
      const index = store.index(neighborhoodCuisineIndex);
      const request = index.get([cuisineType, neighborhood]).openCursor();
      request.onsuccess = event => {
        let results = [];
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();            // This looping syntax is #$%^&'ing bizarre
        }
        callback(null, results);
      };
    }
  }


  /**
   * Get restaurant by id
   */
  static getRestaurant(id, callback) {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, 'readonly');
      const store = transaction.objectStore(restaurantStoreName);
      const request = store.get(id);
      request.onsuccess = () => callback(null, request.result);
    }
  }

  /**
   * Insert an array of restaurants into the database.
   */
  static saveRestaurants(restaurants) {
    if (! restaurants) {
      return;
    }

    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, "readwrite");
      const store = transaction.objectStore(restaurantStoreName);
      restaurants.forEach(restaurant => {
        if (restaurant) {
          store.add(restaurant);
        }
      });
    }
  }

  /**
   * Insert a single restaurant into the database.
   */
  static saveRestaurant(restaurant) {
    if (! restaurant) {
      return;
    }

    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, "readwrite");
      const store = transaction.objectStore(restaurantStoreName);
      store.add(restaurant);
    }
  }


  /**
   * Fetch image details on a given photograph
   */
  static getImageDetails(photograph, callback){
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(imageDetailsStoreName, 'readonly');
      const store = transaction.objectStore(imageDetailsStoreName);
      const request = store.get(photograph);
      request.onsuccess = () => callback(request.result);
    }
  }


  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static getNeighborhoods(callback) {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, 'readonly');
      const store = transaction.objectStore(restaurantStoreName);
      const index = store.index(neighborhoodIndex);
      const request = index.getAllKeys().openCursor();
      request.onsuccess = event => {
        let neighbourhoods = [];
        const cursor = event.target.result;
        if (cursor) {
          neighbourhoods.push(cursor.value);
          cursor.continue();            // This looping syntax is #$%^&'ing bizarre
        }
        callback(null, neighbourhoods);
      };
    }
  }


  /**
   * Fetch all cuisines with proper error handling.
   */
  static getCuisines(callback) {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      const db = dbOpenRequest.result;
      const transaction = db.transaction(restaurantStoreName, 'readonly');
      const store = transaction.objectStore(restaurantStoreName);
      const index = store.index(cuisineIndex);
      const request = index.getAllKeys().openCursor();
      request.onsuccess = event => {
        let cuisines = [];
        const cursor = event.target.result;
        if (cursor) {
          cuisines.push(cursor.value);
          cursor.continue();            // This looping syntax is #$%^&'ing bizarre
        }
        callback(null, cuisines);
      };
    }
  }
}


