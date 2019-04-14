/**
 * Load service worker
 *
 * NB:  Adaptation of code found at https://developers.google.com/web/fundamentals/primers/service-workers/
 */
if (navigator.serviceWorker){
  window.addEventListener('load', () => {
    navigator.serviceWorker
        .register('/service-worker.js', { scope: '/'})
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
  });
}


/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337;
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    DataProvider.getRestaurants((error, dbRestaurants) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (dbRestaurants && dbRestaurants.length > 0) {
        callback(null, dbRestaurants);
        return;
      }

      let xhr = new XMLHttpRequest();
      xhr.open('GET', DBHelper.DATABASE_URL);
      xhr.onload = () => {
        if (xhr.status === 200) {
          let restaurants = JSON.parse(xhr.responseText);
          DataProvider.saveRestaurants(restaurants);
          DBHelper.addImageDetails(restaurants);
          callback(null, restaurants);
          return;
        }

        callback(`Request failed. Returned status of ${xhr.status}`, null);
      };
      xhr.send();
    });
  }

  /**
   * Fetch image details from the database and add them to the restaurant objects.
   */
  static addImageDetails(restaurants){
    if (! restaurants) {
      return;
    }

    restaurants.forEach(restaurant => DBHelper.addImageDetail(restaurant));
  }

  /**
   * Fetch image detail from the database and add it to the restaurant object
   */
  static addImageDetail(restaurant) {
    if (! restaurant) {
      return null;
    }

    DataProvider.getImageDetails(restaurant.photograph, details => {
      restaurant.photographs = details;
    });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    DataProvider.getRestaurant(id, (error, restaurant) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (restaurant) {
        DBHelper.addImageDetail(restaurant);
        callback(null, restaurant);
        return;
      }

      let xhr = new XMLHttpRequest();
      xhr.open('GET', DBHelper.DATABASE_URL + `?id=${id}`);
      xhr.onload = () => {
        if (xhr.status === 200) {
          let restaurant = JSON.parse(xhr.responseText);
          DataProvider.saveRestaurant(restaurant);
          DBHelper.addImageDetail(restaurant);
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
  static fetchNeighborhoods(callback) {
    DataProvider.getNeighborhoods((error, neighbourhoods) => {
      if (error){
        callback(error, null);
        return;
      }

      if (neighbourhoods && neighbourhoods.length > 0) {
        callback(null, neighbourhoods);
        return;
      }

      DBHelper.fetchRestaurants((error, restaurants) => {
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
  static fetchCuisines(callback) {
    DataProvider.getCuisines((error, cuisines) => {
      if (error){
        callback(error, null);
        return;
      }

      if (cuisines && cuisines.length > 0) {
        callback(null, cuisines);
        return;
      }

      DBHelper.fetchRestaurants((error, restaurants) => {
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
  static fetchRestaurantsByCuisine(cuisine, callback) {
    DataProvider.getRestaurantsByCuisineType(cuisine,(error, restaurants) => {
      if (error){
        callback(error, null);
        return;
      }

      if (restaurants) {
        callback(null, restaurants);
        return;
      }

      DBHelper.fetchRestaurants((error, restaurants) => {
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
  static fetchRestaurantsByNeighbourhood(neighbourhood, callback) {
    DataProvider.getRestaurantsByNeighborhood(neighbourhood,(error, restaurants) => {
      if (error){
        callback(error, null);
        return;
      }

      if (restaurants) {
        callback(null, restaurants);
        return;
      }

      DBHelper.fetchRestaurants((error, restaurants) => {
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
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    if (cuisine && cuisine.toLowerCase() === 'all') {
      DBHelper.fetchRestaurantsByCuisine(cuisine, callback);
      return;
    }

    if (neighborhood && neighborhood.toLowerCase() === 'all') {
      DBHelper.fetchRestaurantsByNeighbourhood(neighborhood, callback);
      return;
    }

    DataProvider.getRestaurantsByCuisineTypeAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (restaurants) {
        callback(null, restaurants);
        return null;
      }

      DBHelper.fetchRestaurants((error, restaurants) => {
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

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/images/${restaurant.photographs.images[0].name}`);
  }

  /**
   * Return the srcSet attribute value for a given restaurant
   */
  static srcSetForRestaurant(restaurant) {
    return restaurant.photographs.images
        .map(photo => `/images/${photo.name} ${photo.width}w`)
        .reduce((previous, current) => `${previous}, ${current}`);
  }

  /**
   * Return description of a given restaurant image
   */
  static imageDescriptionForRestaurant(restaurant) {
    return restaurant.photographs.description;
  }

  /**
   * Map marker for a restaurant.
   */
   static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name + ' marker',
      url: DBHelper.urlForRestaurant(restaurant)
      });
      marker.addTo(newMap);
    return marker;
  }
}

