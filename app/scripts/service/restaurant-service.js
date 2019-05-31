import IdbProxyAgent from '../proxy/idb-proxy-agent';
import ServerProxyAgent from '../proxy/server-proxy-agent';
import ImageService from '../service/image-service';
import NetworkMonitor from "../service/network-monitor";
import SyncFavorite from "../model/sync-favorite";


export default class RestaurantService {
  static _instance;

  static getInstance(){
    if (RestaurantService._instance == null){
      RestaurantService._instance = new RestaurantService();
    }
    return RestaurantService._instance;
  }

  _idbProxyAgent;
  _serverProxyAgent;
  _imageService;
  _networkMonitor;

  constructor() {
    this._idbProxyAgent = new IdbProxyAgent();
    this._serverProxyAgent = new ServerProxyAgent();
    this._imageService = new ImageService();
    this._networkMonitor = NetworkMonitor.getInstance();
  }

  async fetchRestaurants() {
    const cachedRestaurants = await this._idbProxyAgent.getRestaurants();
    if (cachedRestaurants && cachedRestaurants.length >= 10) {
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
    const restaurants = await this.fetchRestaurants();
    const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
    return neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
  }

  async fetchCuisines() {
    const restaurants = await this.fetchRestaurants();
    const cuisines = restaurants.map((v, i) => restaurants[i].cuisineType);
    return cuisines.filter((v, i) => cuisines.indexOf(v) === i);
  }

  async fetchRestaurantsByCuisine(cuisine) {
    let restaurants = await this._idbProxyAgent.getRestaurantsByCuisineType(cuisine);
    if (restaurants) {
      await this._imageService.addImageDetails(restaurants);
      return restaurants;
    }
    restaurants = await this.fetchRestaurants();
    return restaurants.filter(restaurant => restaurant.cuisineType === cuisine);
  }

  async fetchRestaurantsByNeighborhood(neighborhood) {
    let restaurants = await this._idbProxyAgent.getRestaurantsByNeighborhood(neighborhood);
    if (restaurants) {
      await this._imageService.addImageDetails(restaurants);
      return restaurants;
    }
    restaurants = await this.fetchRestaurants();
    return restaurants.filter(restaurant => restaurant.neighborhood === neighborhood);
  }

  async fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    if (cuisine && cuisine === 'all' && neighborhood && neighborhood === 'all') {
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
      await this._imageService.addImageDetails(restaurants);
      return restaurants;
    }
    restaurants = await this.fetchRestaurants();
    restaurants = restaurants
      .filter(restaurant => restaurant.neighborhood === neighborhood)
      .filter(restaurant => restaurant.cuisineType === cuisine);
    await this._imageService.addImageDetails(restaurants);
    return restaurants;
  }

  async updateRestaurant(restaurant) {
    await this._idbProxyAgent.updateRestaurant(restaurant);
  }

  async toggleFavoriteIndicator(restaurantId) {
    const restaurant = await this.fetchRestaurantById(restaurantId);
    restaurant.isFavorite = !restaurant.isFavorite;
    await this.updateRestaurant(restaurant);

    if (! this._networkMonitor.isOnline()){
      const syncFavorite = new SyncFavorite(restaurant.id, restaurant.isFavorite);
      await this._idbProxyAgent.saveSyncFavorite(syncFavorite);
    } else {
      await this._serverProxyAgent.updateRestaurantFavoriteStatus(restaurant.id, restaurant.isFavorite);
    }

    return restaurant.isFavorite;
  }

  async syncFavorites(){
    const syncFavorites = await this._idbProxyAgent.getSyncFavorites();
    if (syncFavorites == null) {
      return;
    }
    syncFavorites.forEach(async syncFavorite => {
      if (this._networkMonitor.isOnline()) {
        await this._serverProxyAgent.updateRestaurantFavoriteStatus(syncFavorite.restaurantId, syncFavorite.favoriteInd);
        await this._idbProxyAgent.deleteSyncFavorite(syncFavorite);
      }
    });
  }
}
