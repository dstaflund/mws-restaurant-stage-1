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
    console.log('[RestaurantService - fetchRestaurants]');
      const cachedRestaurants = await this._idbProxy.getRestaurants();
      if (cachedRestaurants && cachedRestaurants.length === 10) {
          await this._imageService.addImageDetails(cachedRestaurants);
          return cachedRestaurants;
      }
      const restaurants = await this._serverProxy.fetchRestaurants();
      await this._idbProxy.saveRestaurants(restaurants, cachedRestaurants);
      await this._imageService.addImageDetails(restaurants);
      return restaurants;
  }

  async fetchRestaurantById(id) {
    console.log('[RestaurantService - fetchRestaurantById (' + id + ')]');
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
    console.log('[RestaurantService - fetchNeighborhoods]');
      let neighborhoods = await this._idbProxy.getNeighborhoods();
      if (neighborhoods && neighborhoods.length === 3) {
        return neighborhoods;
      }
      const restaurants = await this.fetchRestaurants();
      neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
      return neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
  }

  async fetchCuisines() {
    console.log('[RestaurantService - fetchCuisines]');
      let cuisines = await this._idbProxy.getCuisines();
      if (cuisines && cuisines.length === 4) {
          return cuisines;
      }
      const restaurants = await this.fetchRestaurants();
      cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
      return cuisines.filter((v, i) => cuisines.indexOf(v) === i);
  }

  async fetchRestaurantsByCuisine(cuisine) {
    console.log('[RestaurantService - fetchRestaurantsByCuisine(' + cuisine+ ')]');
      let restaurants = await this._idbProxy.getRestaurantsByCuisineType(cuisine);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants.filter(restaurant => restaurant.cuisine_type === cuisine);
  }

  async fetchRestaurantsByNeighborhood(neighborhood) {
    console.log('[RestaurantService - fetchRestaurantsByNeighborhood(' + neighborhood + ')]');
      let restaurants = await this._idbProxy.getRestaurantsByNeighborhood(neighborhood);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants.filter(restaurant => restaurant.neighborhood === neighborhood);
  }

  async fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    console.log('[RestaurantService - fetchRestaurantsByCuisineAndNeighborhood(' + cuisine + ', ' + neighborhood + ')]');
      if (cuisine && cuisine === 'all' && neighborhood && neighborhood === 'all'){
        return await this.fetchRestaurants();
      }
      if (cuisine && cuisine === 'all') {
        return await this.fetchRestaurantsByNeighborhood(neighborhood);
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

  //  TODO: Make sure it works offline as well
  async favoriteRestaurant(restaurantId){
    console.log('[RestaurantService - favoriteRestaurant(' + restaurantId + ')]');
    await this._serverProxy.updateRestaurantFavoriteStatus(restaurantId, true);
  }

  // TODO: Make sure it works offline as well
  async unfavoriteRestaurant(restaurantId){
    console.log('[RestaurantService - unfavoriteRestaurant(' + restaurantId + ')]');
    await this._serverProxy.updateRestaurantFavoriteStatus(restaurantId, false);
  }

    async getLiveMessage(neighborhood, cuisine, resultCount){
      console.log('[RestaurantService - getLiveMessage]');
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
