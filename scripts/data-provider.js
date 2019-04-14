// The following is an adaptation of https://github.com/mdn/to-do-notifications/blob/gh-pages/scripts/todo.js
// The following is an adaptation of https://googlechrome.github.io/samples/idb-getall/

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


class DataProvider {
  static _instance;
  static _db;


  /**
   * Static factory method.
   *
   * Opening the database seems to be an expensive operation so I'll open and store a reference to it once,
   * and model this class as a singleton to ensure that everyone uses the same instance.
   */
  static get instance() {
    if (! DataProvider._instance) {
      DataProvider._instance = new DataProvider();
      DataProvider.openDatabase();
    }
    return DataProvider._instance;
  }


  /**
   * Open database and store reference.
   *
   * Our database consists of two stores -- one to store restaurant information fetched from the server, and
   * another to store image details such as descriptions, width and density information, and so on.
   */
  static openDatabase() {
    const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);
    dbOpenRequest.onsuccess = () => {
      DataProvider._db = dbOpenRequest.result;
    };

    dbOpenRequest.onupgradeneeded = event => {
      DataProvider._db = event.target.result;
      DataProvider.createRestaurantsStore();
      DataProvider.createImageDetailsStore();
    };
  }


  /**
   * Create the restaurant store.
   *
   * Our store will use 'id' as its primary key, as well as indexes on 'neighborhood', 'cuisine_type', and
   * 'neighborhood' / 'cuisine_type' combination to support the restaurant filters.
   */
  static createRestaurantsStore(){
    const store = DataProvider._db.createObjectStore(restaurantStore, { keyPath: "id" });
    store.createIndex(neighborhoodIndex, "neighborhood", { unique: false });
    store.createIndex(cuisineIndex, "cuisine_type", { unique: false });
    store.createIndex(
        neighborhoodCuisineIndex,
        "neighborhood, cuisine_type",
        { unique: false, multiEntry: true }
    );
  }


  /**
   * Create the image details store.
   *
   * Our store will use 'photograph' as its primary key, and will be populated with the data declared at the
   * top of this script.
   *
   * Image details should actually be returned by the server, but there's a consensus in the Udacity project
   * forums that the server component shouldn't be modified.  I'm not sure if this is true or not as some
   * of the github forks of the server project do modify the project.  But I'll stick with the forum consensus
   * for this project and add image details after fetching it from the server.
   */
  static createImageDetailsStore(){
    const store = DataProvider._db.createObjectStore(imageDetailsStore, { keyPath: "photograph" });
    store.transaction.oncomplete = () => {
      const transaction = DataProvider._db.transaction(imageDetailsStore, "readwrite");
      const store = transaction.objectStore(imageDetailsStore);
      imageDetails.forEach(imageDetail => store.add(imageDetail));
    };
  }


  /**
   * Fetch all restaurants.
   */
  getRestaurants(callback) {
    const store = DataProvider._db.transaction(restaurantStore).objectStore(restaurantStore);
    store.onsuccess = () => DataProvider.getCursorValues(store, (restaurants) => callback(null, restaurants));
  }


  /**
   * Get all restaurants in a given neighbourhood
   */
  getRestaurantsByNeighborhood(neighborhood, callback) {
    const index = DataProvider._db
        .transaction(restaurantStore)
        .objectStore(restaurantStore)
        .index(neighborhoodIndex)
        .get(neighborhood);
    index.onsuccess = () => DataProvider.getCursorValues(index, (restaurants) => callback(null, restaurants));
  }


  /**
   * Get all restaurants known for a given cuisine type
   */
  getRestaurantsByCuisineType(cuisineType, callback) {
    const index = DataProvider._db
        .transaction(restaurantStore)
        .objectStore(restaurantStore)
        .index(cuisineIndex)
        .get(cuisineType);
    index.onsuccess = () => DataProvider.getCursorValues(index, (restaurants) => callback(null, restaurants));
  }


  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood, callback) {
    const index = DataProvider._db
        .transaction(restaurantStore)
        .objectStore(restaurantStore)
        .index(neighborhoodCuisineIndex)
        .get([cuisineType, neighborhood]);
    index.onsuccess = () => DataProvider.getCursorValues(index, (restaurants) => callback(null, restaurants));
  }


  /**
   * Get restaurant by id
   */
  getRestaurant(id, callback) {
    const request = DataProvider._db.transaction(restaurantStore).objectStore(restaurantStore).get(id);
    request.onsuccess = () => callback(null, request.result);
  }


  /**
   * Insert an array of restaurants into the database.
   */
  saveRestaurants(restaurants) {
    if (! restaurants) {
      return;
    }

    const store = DataProvider._db.transaction(restaurantStore, "readwrite").objectStore(restaurantStore);
    restaurants.forEach(restaurant => {
      if (restaurant) {
        store.add(restaurant);
      }
    });
  }


  /**
   * Insert a single restaurant into the database.
   */
  saveRestaurant(restaurant) {
    if (! restaurant) {
      return;
    }

    DataProvider._db.transaction(restaurantStore, "readwrite").objectStore(restaurantStore).add(restaurant);
  }


  /**
   * Fetch a photograph's image details
   */
  getImageDetails(photograph, callback){
    const request = DataProvider._db.transaction(imageDetailsStore).objectStore(imageDetailsStore).get(photograph);
    request.onsuccess = () => callback(request.result);
  }


  /**
   * Fetch neighborhoods
   */
  getNeighborhoods(callback) {
    const index = DataProvider._db
        .transaction(restaurantStore)
        .objectStore(restaurantStore)
        .index(neighborhoodIndex)
        .getAllKeys();
    index.onsuccess = () => DataProvider.getCursorValues(index, (restaurants) => callback(null, restaurants));
  }


  /**
   * Fetch cuisine types
   */
  getCuisines(callback) {
    const index = DataProvider._db
        .transaction(restaurantStore)
        .objectStore(restaurantStore)
        .index(cuisineIndex)
        .getAllKeys();
    index.onsuccess = () => DataProvider.getCursorValues(index, (restaurants) => callback(null, restaurants));
  }


  /**
   * Returns all objects associated with the given request's cursor.
   *
   * This method assumes that the request pass into it has a cursor that can be opened.
   */
  static getCursorValues(request, callback) {
    const cursor = request.openCursor();
    cursor.onsuccess = event => {
      let values = [];
      const cursor = event.target.result;
      if (cursor) {
        values.push(cursor.value);
        cursor.continue();
      }
      callback(values);
    };
  }
}


