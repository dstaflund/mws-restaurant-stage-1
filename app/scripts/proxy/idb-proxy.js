import {openDB} from 'idb';

const dbName = 'mws_restaurant_db';
const dbVersion = 1;

const rStore = 'restaurants';
const idStore = 'image_details';
const revStore = 'reviews';

const neighborhoodIndex = 'neighborhood';
const cuisineIndex = 'cuisine_type';
const neighborhoodCuisineIndex = 'neighborhood_cuisine_type';
const restaurantIdIndex = 'restaurant_id';



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
      console.log('IdbProxy - openDatabase]');
      let upgraded = false;
      const db = await openDB(dbName, dbVersion, {
        upgrade(db) {

          // Create restaurant store
          const imageStore = db.createObjectStore(rStore, { keyPath: "id" });
          imageStore.createIndex(neighborhoodIndex, "neighborhood", { unique: false });
          imageStore.createIndex(cuisineIndex, "cuisine_type", { unique: false });
          imageStore.createIndex(
            neighborhoodCuisineIndex,
            "neighborhood.cuisine_type",
            { unique: false, multiEntry: true }
          );

          // Create the image details store
          db.createObjectStore(idStore, { keyPath: "photograph" });

          // Create the reviews store
          const reviewStore = db.createObjectStore(revStore, {keyPath: "id" });
          reviewStore.createIndex(restaurantIdIndex, "restaurant_id", {unique: false });
          upgraded = true;
        }
      });

      // Populate the image details store
      if (upgraded) {
        const tx = db.transaction(idStore, "readwrite");
        for (const imageDetail of imageDetails) {
          tx.store.add(imageDetail);
        }

        await tx.done;
      }

      return db;
    }

    async getRestaurants() {
      console.log('IdbProxy - getRestaurants]');
      const db = await this.openDatabase();
      return await db.getAll(rStore);
    }

    async getRestaurantsByNeighborhood(neighborhood) {
      console.log('IdbProxy - getRestaurantsByNeighborhood(' + neighborhood + ')]');
      const db = await this.openDatabase();
      return await db.getAllFromIndex(rStore, neighborhoodIndex, neighborhood);
    }

    async getRestaurantsByCuisineType(cuisineType) {
      console.log('IdbProxy - getRestaurantsByCuisineType(' + cuisineType + ')]');
      const db = await this.openDatabase();
      return await db.getAllFromIndex(rStore, cuisineIndex, cuisineType);
    }

    async getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood) {
      console.log('IdbProxy - getRestaurantsByCuisineTypeAndNeighborhood(' + cuisineType + ', ' + neighborhood + ')]');
      const db = await this.openDatabase();
      return await db.getAllFromIndex(rStore, neighborhoodCuisineIndex, [neighborhood, cuisineType]);
    }

    async getRestaurant(restaurantId) {
      console.log('IdbProxy - getRestaurant(' + restaurantId + ')]');
      if ('string' === typeof restaurantId) {
        restaurantId = parseInt(restaurantId);
      }
      const db = await this.openDatabase();
      return await db.get(rStore, restaurantId);
    }

    async saveRestaurants(restaurants, cachedRestaurants) {
      console.log('IdbProxy - saveRestaurants]');
      console.log(restaurants);
      console.log(cachedRestaurants);
      const cachedRestaurantIds = cachedRestaurants.map(restaurant => restaurant.id);
      const db = await this.openDatabase();
      const store = db.transaction(rStore, "readwrite").objectStore(rStore);
      restaurants.forEach(restaurant => {
        if (! cachedRestaurantIds.includes(restaurant.id)) {
          store.add(restaurant);
        }
      });
    }

    async saveRestaurant(restaurant) {
      console.log('IdbProxy - saveRestaurant]');
      console.log(restaurant);
      const db = await this.openDatabase();
      db
        .transaction(rStore, "readwrite")
        .objectStore(rStore)
        .add(restaurant);
    }

    async updateRestaurant(restaurant){
      console.log('IdbProxy - updateRestaurant]');
      console.log(restaurant);
      const db = await this.openDatabase();
      db
        .transaction(rStore, "readwrite")
        .objectStore(rStore)
        .update(restaurant);
    }

    async getImageDetails(photograph){
      console.log('IdbProxy - getImageDetails(' + photograph + ')]');
      if ('string' === typeof photograph) {
        photograph = parseInt(photograph);
      }
      const db = await this.openDatabase();
      return await db.get(idStore, photograph);
    }

    async getNeighborhoods() {
      console.log('IdbProxy - getNeighborhoods]');
      const db = await this.openDatabase();
      return await db.getAllKeysFromIndex(rStore, neighborhoodIndex);
    }

    async getCuisines() {
      console.log('IdbProxy - getCuisines]');
        const db = await this.openDatabase();
        return await db.getAllKeysFromIndex(rStore, cuisineIndex);
    }

    async getReviews(){
      console.log('IdbProxy - getReviews]');
      const db = await this.openDatabase();
      return await db.getAll(revStore);
    }

  async getReviewById(reviewId){
    console.log('IdbProxy - getReviewById(' + reviewId + ')]');
    if ('string' === typeof reviewId) {
      reviewId = parseInt(reviewId);
    }
    const db = await this.openDatabase();
    return await db.get(revStore, reviewId);
  }

  async getReviewsByRestaurantId(restaurantId){
    console.log('IdbProxy - getReviewsByRestaurantId(' + restaurantId + ')]');
    if ('string' === typeof restaurantId) {
      restaurantId = parseInt(restaurantId);
    }
    const db = await this.openDatabase();
    return await db.getAllFromIndex(revStore, restaurantIdIndex, restaurantId);
  }

    async saveReviews(reviews, cachedReviews){
      console.log('IdbProxy - saveReviews]');
      console.log(reviews);
      console.log(cachedReviews);
      const cachedReviewIds = cachedReviews.map(review => review.id);
      const db = await this.openDatabase();
      const store = db.transaction(revStore, "readwrite").objectStore(revStore);
      reviews.forEach(review => {
        if (! cachedReviewIds.includes(review.id)) {
          store.add(review);
        }
      });
    }

    async updateReview(review){
      console.log('IdbProxy - updateReview]');
      console.log(review);
      const db = await this.openDatabase();
      db
        .transaction(revStore, "readwrite")
        .objectStore(revStore)
        .update(review);
    }

    async deleteReview(reviewId){
      console.log('IdbProxy - deleteReview(' + reviewId + ')]');
      if ('string' === typeof reviewId) {
        reviewId = parseInt(reviewId);
      }
      const db = await this.openDatabase();
      db
        .transaction(revStore, "readwrite")
        .objectStore(revStore)
        .delete(reviewId);
    }
}
