import { openDB } from 'idb';

const dbName = 'mws_restaurant_db';
const dbVersion = 1;

const rStore = 'restaurants';
const idStore = 'image_details';

const neighborhoodIndex = 'neighborhood';
const cuisineIndex = 'cuisine_type';
const neighborhoodCuisineIndex = 'neighborhood_cuisine_type';



/**
 * I would prefer to fetch this information from the server, but I am told we're not to
 * modify the server for Project 2.  So I'm going to place it in a database store.
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
export default class IdbProxy {

    constructor(){
    }

    async openDatabase() {
      console.log('[idb-proxy - openDatabase]');
      let upgraded = false;
      const db = await openDB(dbName, dbVersion, {
        upgrade(db) {
          console.log(1);

          // Create restaurant store
          const imageStore = db.createObjectStore(rStore, { keyPath: "id" });
          console.log(2);
          imageStore.createIndex(neighborhoodIndex, "neighborhood", { unique: false });
          console.log(3);
          imageStore.createIndex(cuisineIndex, "cuisine_type", { unique: false });
          console.log(4);
          imageStore.createIndex(
            neighborhoodCuisineIndex,
            "neighborhood.cuisine_type",
            { unique: false, multiEntry: true }
          );
          console.log(5);

          // Create and populate image details store
          db.createObjectStore(idStore, { keyPath: "photograph" });
          console.log(5);
          upgraded = true;
        }
      });
      if (upgraded) {
        console.log(6);
        const tx = db.transaction(idStore, "readwrite");
        console.log(7);
        console.log(imageDetails);
        for (const imageDetail of imageDetails) {
          console.log(8);
          tx.store.add(imageDetail);
        }
        console.log(9);

        await tx.done;
      }

      console.log(10);
      return db;
    }

    async getRestaurants() {
      console.log('[idb-proxy - getRestaurants]');
      const db = await this.openDatabase();
      const store = await db.transaction(rStore).objectStore(rStore);
      const restaurants = await this.getCursorValues(store);
      console.log('returning the following restaurants from the database...');
      console.log(restaurants);
      return restaurants;
    }

    async getRestaurantsByNeighborhood(neighborhood) {
      console.log('[idb-proxy - getRestaurantsByNeighborhood]');
      console.log('neighbourhood = ' + neighborhood);
      const db = await this.openDatabase();
      console.log(db);
      const tx = await db.transaction(rStore);
      console.log(tx);
      const index = await tx.objectStore(rStore).index(neighborhoodIndex);
      console.log(index);
      const index2 = await index.get(neighborhood);
      console.log(index2);
      return await this.getCursorValues(index2);
    }

    async getRestaurantsByCuisineType(cuisineType) {
      console.log('[idb-proxy - getRestaurantsByCuisineType]');
      const db = await this.openDatabase();
      const index = await db
          .transaction(rStore)
          .objectStore(rStore)
          .index(cuisineIndex)
          .get(cuisineType);
      return await this.getCursorValues(index);
    }

    async getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood) {
      console.log('[idb-proxy - getRestaurantsByCuisineTypeAndNeighborhood]');
      const db = await this.openDatabase();
      const index = await db
          .transaction(rStore)
          .objectStore(rStore)
          .index(neighborhoodCuisineIndex)
          .get([cuisineType, neighborhood]);
      return await this.getCursorValues(index);
    }

    async getRestaurant(id) {
      console.log('[idb-proxy - getRestaurant]');
      const db = await this.openDatabase();
      const request = await db.transaction(rStore).objectStore(rStore).get(id);
      return request;
    }

    async saveRestaurants(restaurants) {
      console.log('[idb-proxy - saveRestaurants]');
      const db = await this.openDatabase();
      const store = db.transaction(rStore, "readwrite").objectStore(rStore);
      console.log('inserting...');
      restaurants.forEach(restaurant => {
        console.log(restaurant);
          store.add(restaurant);
      });
    }

    async saveRestaurant(restaurant) {
      console.log('[idb-proxy - saveRestaurant]');
      const db = await this.openDatabase();
      db
          .transaction(rStore, "readwrite")
          .objectStore(rStore)
          .add(restaurant);
    }

    async getImageDetails(photograph){
      console.log('[idb-proxy - getImageDetails]');
      if ('string' === typeof photograph) {
        photograph = parseInt(photograph);
      }
      const db = await this.openDatabase();
      const request = await db.transaction(idStore).objectStore(idStore).get(photograph);
      console.log(photograph);
      console.log(request);
      console.log(typeof photograph);
      return request;
    }

    async getNeighborhoods() {
      console.log('[idb-proxy - getNeighborhoods]');
      const db = await this.openDatabase();
      const index = await db
            .transaction(rStore)
            .objectStore(rStore)
            .index(neighborhoodIndex)
            .getAllKeys();
        return await this.getCursorValues(index);
    }

    async getCuisines() {
        console.log('[idb-proxy - getCuisines]');
        const db = await this.openDatabase();
        const index = await db
            .transaction(rStore)
            .objectStore(rStore)
            .index(cuisineIndex)
            .getAllKeys();
        return await this.getCursorValues(index);
    }

    async getCursorValues(request) {
      console.log('[idb-proxy - getCursorValues]');
      console.log(request);
      let cursor = await request.openCursor();
      let values = [];
      console.log('pushing...');
      while (cursor) {
        console.log(cursor.value);
        values.push(cursor.value);
        cursor = await cursor.continue();
      }
      return values;
    }
}
