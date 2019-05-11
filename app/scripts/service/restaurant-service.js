import IdbProxyAgent from '../proxy/idb-proxy-agent';
import ServerProxyAgent from '../proxy/server-proxy-agent';
import ImageService from '../service/image-service';


export default class RestaurantService {
  _idbProxyAgent;
  _serverProxyAgent;
  _imageService;

  constructor(){
    this._idbProxyAgent = new IdbProxyAgent();
    this._serverProxyAgent = new ServerProxyAgent();
    this._imageService = new ImageService();
  }

  async fetchRestaurants() {
      const cachedRestaurants = await this._idbProxyAgent.getRestaurants();
      if (cachedRestaurants && cachedRestaurants.length === 10) {
          await this._imageService.addImageDetails(cachedRestaurants);
          return cachedRestaurants;
      }
      const restaurants = await this._serverProxyAgent.fetchRestaurants();
      await this._idbProxyAgent.saveRestaurants(restaurants, cachedRestaurants);
      await this._imageService.addImageDetails(restaurants);
      return restaurants;
  }

  async fetchRestaurantById(id) {
      let restaurant = await this._idbProxyAgent.getRestaurant(id);
      if (restaurant) {
          await this._imageService.addImageDetail(restaurant);
          return restaurant;
      }
      restaurant = await this._serverProxyAgent.fetchRestaurantById(id);
      await this._idbProxyAgent.saveRestaurant(restaurant);
      await this._imageService.addImageDetail(restaurant);
      return restaurant;
  }

  async fetchNeighborhoods() {
      let neighborhoods = await this._idbProxyAgent.getNeighborhoods();
      if (neighborhoods && neighborhoods.length === 3) {
        return neighborhoods;
      }
      const restaurants = await this.fetchRestaurants();
      neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
      return neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
  }

  async fetchCuisines() {
      let cuisines = await this._idbProxyAgent.getCuisines();
      if (cuisines && cuisines.length === 4) {
          return cuisines;
      }
      const restaurants = await this.fetchRestaurants();
      cuisines = restaurants.map((v, i) => restaurants[i].cuisineType);
      return cuisines.filter((v, i) => cuisines.indexOf(v) === i);
  }

  async fetchRestaurantsByCuisine(cuisine) {
      let restaurants = await this._idbProxyAgent.getRestaurantsByCuisineType(cuisine);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants.filter(restaurant => restaurant.cuisineType === cuisine);
  }

  async fetchRestaurantsByNeighborhood(neighborhood) {
      let restaurants = await this._idbProxyAgent.getRestaurantsByNeighborhood(neighborhood);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants.filter(restaurant => restaurant.neighborhood === neighborhood);
  }

  async fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
      if (cuisine && cuisine === 'all' && neighborhood && neighborhood === 'all'){
        return await this.fetchRestaurants();
      }
      if (cuisine && cuisine === 'all') {
        return await this.fetchRestaurantsByNeighborhood(neighborhood);
      }
      if (neighborhood && neighborhood === 'all') {
        return await this.fetchRestaurantsByCuisine(cuisine);
      }
      let restaurants = await this._idbProxyAgent.getRestaurantsByCuisineTypeAndNeighborhood(cuisine, neighborhood);
      if (restaurants && restaurants.length === 10) {
          return restaurants;
      }
      restaurants = await this.fetchRestaurants();
      return restaurants
        .filter(restaurant => restaurant.neighborhood === neighborhood)
        .filter(restaurant => restaurant.cuisineType === cuisine);
  }

  async updateRestaurant(restaurant){
    await this._idbProxyAgent.updateRestaurant(restaurant);
  }

  async toggleFavoriteIndicator(restaurantId){
    const restaurant = await this.fetchRestaurantById(restaurantId);
    restaurant.isFavorite = ! restaurant.isFavorite;
    await this.updateRestaurant(restaurant);
    await this._serverProxyAgent.updateRestaurantFavoriteStatus(restaurant.id, restaurant.isFavorite);
    return restaurant.isFavorite;
  }

    async getLiveMessage(neighborhood, cuisine, resultCount){
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
