/**
 * Load service worker
 *
 * NB:  Adaptation of code found at https://developers.google.com/web/fundamentals/primers/service-workers/
 */
/*
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
 */

import {DataProvider} from "./provider/DataProvider";

DataProvider.openDatabase();

const imageDetails = [
  {
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
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const restaurants = DBHelper.addImageInformation(JSON.parse(xhr.responseText));
        callback(null, restaurants);
      } else {
        const error = ( `Request failed. Returned status of ${xhr.status}` );
        callback(error, null);
      }
    };
    xhr.send();
  }

  static addImageInformation(restaurants){
    if (! restaurants) {
      return null;
    }
    restaurants.forEach(restaurant => {
      restaurant.photographs = imageDetails[(+ restaurant.photograph) - 1];
    });
    return restaurants;
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => Number(r.id) === Number(id));
        if (restaurant) {
          callback(null, restaurant);
        } else {
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants;
        if (cuisine !== 'all') {
          results = results.filter(r => r.cuisine_type === cuisine);
        }
        if (neighborhood !== 'all') {
          results = results.filter(r => r.neighborhood === neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) === i);
        callback(null, uniqueCuisines);
      }
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

