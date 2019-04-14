/**
 * Load service worker
 *
 * NB:  Adaptation of code found at https://developers.google.com/web/fundamentals/primers/service-workers/
 */
// if (navigator.serviceWorker){
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//         .register('/service-worker.js', { scope: '/'})
//         .then(registration => {
//           console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         })
//         .catch(err => {
//           console.log('ServiceWorker registration failed: ', err);
//         });
//   });
// }


/**
 * Common database helper functions.
 */
class RestaurantService {
  static _instance;


  /**
   * Static factory method.
   */
  static get instance() {
    if (! RestaurantService._instance) {
      RestaurantService._instance = new RestaurantService();
    }
    return RestaurantService._instance;
  }


  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337;
    return `http://localhost:${port}/restaurants`;
  }


  _provider;
  _imageService;


  /**
   * Constructor.
   *
   * Save a DataProvider reference.
   */
  constructor(){
    this._provider = DataProvider.instance;
    this._imageService = ImageService.instance;
  }


  /**
   * Fetch all restaurants.
   */
  fetchRestaurants(callback) {
    this._provider.getRestaurants((error, dbRestaurants) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (dbRestaurants && dbRestaurants.length > 0) {
        callback(null, dbRestaurants);
        return;
      }

      let xhr = new XMLHttpRequest();
      xhr.open('GET', RestaurantService.DATABASE_URL);
      xhr.onload = () => {
        if (xhr.status === 200) {
          let restaurants = JSON.parse(xhr.responseText);
          this._provider.saveRestaurants(restaurants);
          this._imageService.addImageDetails(restaurants);
          callback(null, restaurants);
          return;
        }

        callback(`Request failed. Returned status of ${xhr.status}`, null);
      };
      xhr.send();
    });
  }


  /**
   * Fetch a restaurant by its ID.
   */
  fetchRestaurantById(id, callback) {
    this._provider.getRestaurant(id, (error, restaurant) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (restaurant) {
        this._imageService.addImageDetail(restaurant);
        callback(null, restaurant);
        return;
      }

      let xhr = new XMLHttpRequest();
      xhr.open('GET', RestaurantService.DATABASE_URL + `?id=${id}`);
      xhr.onload = () => {
        if (xhr.status === 200) {
          let restaurant = JSON.parse(xhr.responseText);
          this._provider.saveRestaurant(restaurant);
          this._imageService.addImageDetail(restaurant);
          callback(null, restaurant);
          return;
        }

        callback(`Request failed. Returned status of ${xhr.status}`, null);
      };
      xhr.send();
    });
  }


  /**
   * Fetch all neighborhoods with proper error handling.
   */
  fetchNeighborhoods(callback) {
    this._provider.getNeighborhoods((error, neighbourhoods) => {
      if (error){
        callback(error, null);
        return;
      }

      if (neighbourhoods && neighbourhoods.length > 0) {
        callback(null, neighbourhoods);
        return;
      }

      this.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
          return;
        }

        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
        callback(null, uniqueNeighborhoods);
      });
    });
  }


  /**
   * Fetch all cuisines with proper error handling.
   */
  fetchCuisines(callback) {
    this._provider.getCuisines((error, cuisines) => {
      if (error){
        callback(error, null);
        return;
      }

      if (cuisines && cuisines.length > 0) {
        callback(null, cuisines);
        return;
      }

      this.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
          return;
        }

        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) === i);
        callback(null, uniqueCuisines);
      });
    });
  }


  /**
   * Fetch restaurants by cuisine
   */
  fetchRestaurantsByCuisine(cuisine, callback) {
    this._provider.getRestaurantsByCuisineType(cuisine,(error, restaurants) => {
      if (error){
        callback(error, null);
        return;
      }

      if (restaurants) {
        callback(null, restaurants);
        return;
      }

      this.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
          return;
        }

        const filteredRestaurants = restaurants.filter(restaurant => restaurant.cuisine_type === cuisine);
        callback(null, filteredRestaurants);
      });
    });
  }


  /**
   * Fetch restaurants by neighbourhood
   */
  fetchRestaurantsByNeighbourhood(neighbourhood, callback) {
    this._provider.getRestaurantsByNeighborhood(neighbourhood,(error, restaurants) => {
      if (error){
        callback(error, null);
        return;
      }

      if (restaurants) {
        callback(null, restaurants);
        return;
      }

      this.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
          return;
        }

        const filteredRestaurants = restaurants.filter(restaurant => restaurant.neighborhood === neighbourhood);
        callback(null, filteredRestaurants);
      });
    });
  }


  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    if (cuisine && cuisine.toLowerCase() === 'all') {
      this.fetchRestaurantsByCuisine(cuisine, callback);
      return;
    }

    if (neighborhood && neighborhood.toLowerCase() === 'all') {
      this.fetchRestaurantsByNeighbourhood(neighborhood, callback);
      return;
    }

    this._provider.getRestaurantsByCuisineTypeAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (restaurants) {
        callback(null, restaurants);
        return null;
      }

      this.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
          return;
        }

        const filteredRestaurants = restaurants.filter(
            restaurant => restaurant.neighborhood === neighborhood && restaurant.cuisine_type === cuisine
        );
        callback(null, filteredRestaurants);
      });
    });
  }
}

