export default class NetworkMonitor {
  static _instance;

  static getInstance(){
    if (NetworkMonitor._instance == null) {
      NetworkMonitor._instance = new NetworkMonitor();
    }
    return NetworkMonitor._instance;
  }

  _restaurantService;
  _reviewService;
  _onlineCallback;
  _offlineCallback;

  constructor(){
  }

  registerRestaurantService(restaurantService) {
    this._restaurantService = restaurantService;
  }

  registerReviewService(reviewService){
    this._reviewService = reviewService;
  }

  registerOnlineCallback(onlineCallback){
    this._onlineCallback = onlineCallback;
  }

  registerOfflineCallback(offlineCallback){
    this._offlineCallback = offlineCallback;
  }

  addEventListeners(){
    window.addEventListener(
      'online',
      async (evt, restaurantService = this._restaurantService, reviewService = this._reviewService) => {
      await restaurantService.syncFavorites();
      await reviewService.syncReviews();
      this._onlineCallback();
    });
    window.addEventListener(
      'offline',
      async () => {
        this._offlineCallback();
    });
  }

  isOnline() {
    return navigator.onLine;
  }
}
