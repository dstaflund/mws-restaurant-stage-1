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

import IdbProxy from '../proxy/idb-proxy';
import ServerProxy from '../proxy/server-proxy';
import ImageService from '../service/image-service';


export default class RestaurantService {
  _idbProxy;
  _serverProxy;
  _imageService;

  constructor(){
    this._idbProxy = new IdbProxy();
    this._serverProxy = new ServerProxy();
    this._imageService = new ImageService();
  }

  async fetchRestaurants() {
      console.log('[restaurant-service - fetchRestaurants]');
      let restaurants = await this._idbProxy.getRestaurants();
      if (restaurants && restaurants.length === 10) {
          await this._imageService.addImageDetails(restaurants);
          return restaurants;
      }
      restaurants = await this._serverProxy.fetchRestaurants();
      await this._idbProxy.saveRestaurants(restaurants);
      await this._imageService.addImageDetails(restaurants);
      return restaurants;
  }

  async fetchRestaurantById(id) {
      console.log('[restaurant-service - fetchRestaurantById]');
      let restaurant = await this._idbProxy.getRestaurant(id);
      if (restaurant) {
          await this._imageService.addImageDetail(restaurant);
          return restaurant;
      }
      restaurant = await this._serverProxy.fetchRestaurantById(id);
      await this._idbProxy.saveRestaurant(restaurant);
      await this._imageService.addImageDetail(restaurant);
      return restaurant;
  }

  async fetchNeighborhoods() {
      console.log('[restaurant-service - fetchNeighborhoods]');
      let neighborhoods = await this._idbProxy.getNeighborhoods();
      if (neighborhoods && neighborhoods.length === 3) {
        return neighborhoods;
      }
      const restaurants = await this.fetchRestaurants();
      neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
      return neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
  }

  async fetchCuisines() {
      console.log('[restaurant-service - fetchCuisines]');
      let cuisines = await this._idbProxy.getCuisines();
      if (cuisines && cuisines.length === 4) {
          return cuisines;
      }
      const restaurants = await this.fetchRestaurants();
      cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
      return cuisines.filter((v, i) => cuisines.indexOf(v) === i);
  }

  async fetchRestaurantsByCuisine(cuisine) {
      console.log('[restaurant-service - fetchRestaurantsByCuisine]');
      let restaurants = await this._idbProxy.getRestaurantsByCuisineType(cuisine);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants.filter(restaurant => restaurant.cuisine_type === cuisine);
  }

  async fetchRestaurantsByNeighbourhood(neighbourhood) {
      console.log('[restaurant-service - fetchRestaurantsByNeighborhood]');
      let restaurants = await this._idbProxy.getRestaurantsByNeighborhood(neighbourhood);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants.filter(restaurant => restaurant.neighborhood === neighbourhood);
  }

  async fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
      console.log('[restaurant-service - fetchRestaurantsByCuisineAndNeighborhood]');
      if (cuisine && cuisine === 'all') {
        return await this.fetchRestaurantsByNeighbourhood(neighborhood);
      }
      if (neighborhood && neighborhood === 'all') {
        return await this.fetchRestaurantsByCuisine(cuisine);
      }
      let restaurants = await this._idbProxy.getRestaurantsByCuisineTypeAndNeighborhood(cuisine, neighborhood);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants
        .filter(restaurant => restaurant.neighborhood === neighborhood)
        .filter(restaurant => restaurant.cuisine_type === cuisine);
  }

    async getLiveMessage(neighborhood, cuisine, resultCount){
        console.log('[restaurant-service - getLiveMessage]');
        let msg;

        switch(resultCount) {
            case 0:
                msg = 'No restaurants found ';
                break;

            case 1:
                msg = '1 restaurant found ';
                break;

            default:
                msg = resultCount + ' restaurants found ';
        }

        msg += cuisine === 'all' ? ''  : cuisine === 'Pizza' ? 'serving pizza ' : 'serving ' + cuisine + ' cuisine ';
        msg += neighborhood === 'all' ? '' : 'in ' + neighborhood;

        return msg;
    }
}
