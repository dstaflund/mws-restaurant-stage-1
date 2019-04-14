class DataProvider {
  static _instance;

  static get instance() {
    return new Promise((resolve, reject) => {
      if (! DataProvider._instance) {
        DataProvider._instance = new DataProvider();
        DataProvider._instance.initialize()
            .then(() => resolve(DataProvider._instance))
            .catch(error => reject(error));
      }
      resolve(DataProvider._instance);
    });
  }

  _idbProxy;
  _serverProxy;

  initialize(){
    return new Promise((resolve, reject) => {
      IdbProxy.instance
          .then(idbProxy => {
            this._idbProxy = idbProxy;
            ServerProxy.instance
                .then(serverProxy => {
                  this._serverProxy = serverProxy;
                  resolve();
                })
                .catch(error => reject(error));
          })
          .catch(error => reject(error));
    });
  }

  getRestaurants() {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurants()
          .then(restaurants => resolve(restaurants))
          .catch(error => reject(error));
    });
  }

  getRestaurantsByNeighborhood(neighborhood) {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurantsByNeighborhood(neighborhood)
          .then(restaurants => resolve(restaurants))
          .catch(error => reject(error));
    });
  }

  getRestaurantsByCuisineType(cuisineType) {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurantsByCuisineType(cuisineType)
          .then(restaurants => resolve(restaurants))
          .catch(error => reject(error));
    });
  }

  getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood) {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood)
          .then(restaurants => resolve(restaurants))
          .catch(error => reject(error));
    });
  }

  getRestaurant(id) {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurant(id)
          .then(restaurant => resolve(restaurant))
          .catch(error => reject(error));
    });
  }

  saveRestaurants(restaurants) {
    return new Promise((resolve, reject) => {
      this._idbProxy.saveRestaurants(restaurants)
          .then(() => resolve())
          .catch(error => reject(error));
    });
  }

  saveRestaurant(restaurant) {
    return new Promise((resolve, reject) => {
      this._idbProxy.saveRestaurant(restaurant)
          .then(() => resolve())
          .catch(error => reject(error));
    });
  }

  getImageDetails(photograph){
    return new Promise((resolve, reject) => {
      this._idbProxy.getImageDetails(photograph)
          .then(details => resolve(details))
          .catch(error => reject(error));
    });
  }

  getNeighborhoods() {
    return new Promise((resolve, reject) => {
      this._idbProxy.getNeighborhoods()
          .then(neighborhoods => resolve(neighborhoods))
          .catch(error => reject(error));
    });
  }

  getCuisines() {
    return new Promise((resolve, reject) => {
      this._idbProxy.getCuisines()
          .then(cuisines => resolve(cuisines))
          .catch(error => reject(error));
    });
  }
}


