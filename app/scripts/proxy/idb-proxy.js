import {openDB} from 'idb';

const dbName = 'mws_restaurant_db';
const dbVersion = 1;

const rStore = 'restaurants';
const idStore = 'image_details';
const revStore = 'reviews';
const syncFavoritesStore = 'sync_favorites';
const syncReviewsStore = 'sync_reviews';

const neighborhoodIndex = 'neighborhood';
const cuisineIndex = 'cuisineType';
const neighborhoodCuisineIndex = 'neighborhood_cuisineType';
const restaurantIdIndex = 'restaurantId';

/**
 * I would prefer to fetch this information from the server, but I am told we're not to
 * modify the server for Project 2.  So I'm going to place it in a database store.
 */
const imageDetails = [
  {
    "photograph": 1,
    "description": "Diners inside Mission Chinese Food",
    "images": [
      {"name": "1-250px.jpg", "width": "250", "density": "1"},
      {"name": "1-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "1-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "1-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "1-500px.jpg", "width": "500", "density": "2"},
      {"name": "1-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "1-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "1-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "1-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 2,
    "description": "Emily's Freshly made pizza",
    "images": [
      {"name": "2-250px.jpg", "width": "250", "density": "1"},
      {"name": "2-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "2-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "2-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "2-500px.jpg", "width": "500", "density": "2"},
      {"name": "2-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "2-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "2-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "2-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 3,
    "description": "Kang Ho Dong Baekjeong seating area",
    "images": [
      {"name": "3-250px.jpg", "width": "250", "density": "1"},
      {"name": "3-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "3-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "3-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "3-500px.jpg", "width": "500", "density": "2"},
      {"name": "3-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "3-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "3-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "3-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 4,
    "description": "Katz's Delicatessen storefront",
    "images": [
      {"name": "4-250px.jpg", "width": "250", "density": "1"},
      {"name": "4-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "4-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "4-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "4-500px.jpg", "width": "500", "density": "2"},
      {"name": "4-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "4-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "4-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "4-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 5,
    "description": "Diners and staff inside Roberta's Pizza",
    "images": [
      {"name": "5-250px.jpg", "width": "250", "density": "1"},
      {"name": "5-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "5-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "5-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "5-500px.jpg", "width": "500", "density": "2"},
      {"name": "5-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "5-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "5-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "5-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 6,
    "description": "Diners inside Hometown BBQ",
    "images": [
      {"name": "6-250px.jpg", "width": "250", "density": "1"},
      {"name": "6-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "6-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "6-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "6-500px.jpg", "width": "500", "density": "2"},
      {"name": "6-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "6-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "6-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "6-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 7,
    "description": "Superiority Burger's storefront",
    "images": [
      {"name": "7-250px.jpg", "width": "250", "density": "1"},
      {"name": "7-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "7-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "7-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "7-500px.jpg", "width": "500", "density": "2"},
      {"name": "7-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "7-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "7-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "7-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 8,
    "description": "The Dutch's storefront",
    "images": [
      {"name": "8-250px.jpg", "width": "250", "density": "1"},
      {"name": "8-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "8-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "8-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "8-500px.jpg", "width": "500", "density": "2"},
      {"name": "8-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "8-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "8-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "8-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 9,
    "description": "Diners inside Mu Ramen",
    "images": [
      {"name": "9-250px.jpg", "width": "250", "density": "1"},
      {"name": "9-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "9-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "9-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "9-500px.jpg", "width": "500", "density": "2"},
      {"name": "9-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "9-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "9-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "9-750px.jpg", "width": "750", "density": "3"}
    ]
  },
  {
    "photograph": 10,
    "description": "Casa Enrique's seating area",
    "images": [
      {"name": "10-250px.jpg", "width": "250", "density": "1"},
      {"name": "10-331px.jpg", "width": "331", "density": "1.324"},
      {"name": "10-375px.jpg", "width": "375", "density": "1.5"},
      {"name": "10-425px.jpg", "width": "425", "density": "1.7"},
      {"name": "10-500px.jpg", "width": "500", "density": "2"},
      {"name": "10-583px.jpg", "width": "583", "density": "2.33"},
      {"name": "10-600px.jpg", "width": "600", "density": "2.4"},
      {"name": "10-628px.jpg", "width": "628", "density": "2.51"},
      {"name": "10-750px.jpg", "width": "750", "density": "3"}
    ]
  }
];


/**
 * This class contains all IndexedDB-related code
 */
export default class IdbProxy {

  async openDatabase() {
    let upgraded = false;
    const db = await openDB(dbName, dbVersion, {
      upgrade(db) {

        // Create restaurant store
        const imageStore = db.createObjectStore(rStore, {keyPath: "id"});
        imageStore.createIndex(neighborhoodIndex, "neighborhood", {unique: false});
        imageStore.createIndex(cuisineIndex, "cuisineType", {unique: false});
        imageStore.createIndex(
          neighborhoodCuisineIndex,
          "neighborhood.cuisineType",
          {unique: false, multiEntry: true}
        );

        // Create the image details store
        db.createObjectStore(idStore, {keyPath: "photograph"});

        // Create the reviews store
        const reviewStore = db.createObjectStore(revStore, {keyPath: "id"});
        reviewStore.createIndex(restaurantIdIndex, "restaurantId", {unique: false});
        upgraded = true;

        // Create the various sync stores
        db.createObjectStore(syncFavoritesStore, {keyPath: "restaurantId"});
        db.createObjectStore(syncReviewsStore, {keyPath: "hash"});
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
    const db = await this.openDatabase();
    return await db.getAll(rStore);
  }

  async getRestaurantsByNeighborhood(neighborhood) {
    const db = await this.openDatabase();
    return await db.getAllFromIndex(rStore, neighborhoodIndex, neighborhood);
  }

  async getRestaurantsByCuisineType(cuisineType) {
    const db = await this.openDatabase();
    return await db.getAllFromIndex(rStore, cuisineIndex, cuisineType);
  }

  async getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood) {
    const db = await this.openDatabase();
    return await db.getAllFromIndex(rStore, neighborhoodCuisineIndex, [neighborhood, cuisineType]);
  }

  async getRestaurant(restaurantId) {
    const db = await this.openDatabase();
    return await db.get(rStore, restaurantId);
  }

  async saveRestaurants(restaurants, cachedRestaurantIds) {
    const db = await this.openDatabase();
    const store = db.transaction(rStore, "readwrite").objectStore(rStore);
    restaurants.forEach(restaurant => {
      if (!cachedRestaurantIds.includes(restaurant.id)) {
        store.add(restaurant);
      }
    });
  }

  async saveRestaurant(restaurant) {
    const db = await this.openDatabase();
    await db
      .transaction(rStore, "readwrite")
      .objectStore(rStore)
      .add(restaurant);
  }

  async updateRestaurant(restaurant) {
    const db = await this.openDatabase();
    await db
      .transaction(rStore, "readwrite")
      .objectStore(rStore)
      .put(restaurant);
  }

  async getImageDetails(photograph) {
    const db = await this.openDatabase();
    return await db.get(idStore, photograph);
  }

  async getReviews() {
    const db = await this.openDatabase();
    return await db.getAll(revStore);
  }

  async getReviewById(reviewId) {
    const db = await this.openDatabase();
    return await db.get(revStore, reviewId);
  }

  async getReviewsByRestaurantId(restaurantId) {
    const db = await this.openDatabase();
    return await db.getAllFromIndex(revStore, restaurantIdIndex, restaurantId);
  }

  async saveReviews(reviews, cachedReviewIds) {
    const db = await this.openDatabase();
    const store = db.transaction(revStore, "readwrite").objectStore(revStore);
    reviews.forEach(review => {
      if (!cachedReviewIds.includes(review.id)) {
        store.add(review);
      }
    });
  }

  async saveReview(review) {
    const db = await this.openDatabase();
    await db
      .transaction(revStore, "readwrite")
      .objectStore(revStore)
      .add(review);
    return review;
  }

  async getSyncFavorites(){
    const db = await this.openDatabase();
    return await db.getAll(syncFavoritesStore);
  }

  async getSyncFavorite(restaurantId){
    const db = await this.openDatabase();
    return await db.get(syncFavoritesStore, restaurantId);
  }

  async saveSyncFavorite(syncFavorite){
    const db = await this.openDatabase();
    await db
      .transaction(syncFavoritesStore, "readwrite")
      .objectStore(syncFavoritesStore)
      .add(syncFavorite);
  }

  async updateSyncFavorite(syncFavorite){
    const db = await this.openDatabase();
    await db
      .transaction(syncFavoritesStore, "readwrite")
      .objectStore(syncFavoritesStore)
      .put(syncFavorite);
  }

  async deleteSyncFavorite(restaurantId){
    const db = await this.openDatabase();
    return await db.delete(syncFavoritesStore, restaurantId);
  }

  async getSyncReviews(){
    const db = await this.openDatabase();
    return await db.getAll(syncReviewsStore);
  }

  async saveSyncReview(syncReview){
    const db = await this.openDatabase();
    await db
      .transaction(syncReviewsStore, "readwrite")
      .objectStore(syncReviewsStore)
      .add(syncReview);
  }

  async deleteSyncReview(hash){
    const db = await this.openDatabase();
    return await db.delete(syncReviewsStore, hash);
  }
}
