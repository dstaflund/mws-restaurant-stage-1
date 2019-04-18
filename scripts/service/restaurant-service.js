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

class RestaurantService {
  static _instance;

  static get instance() {
    return new Promise((resolve, reject) => {
      if (! RestaurantService._instance) {
        RestaurantService._instance = new RestaurantService();
        RestaurantService._instance.initialize()
            .then(() => resolve(RestaurantService._instance))
      }
      resolve(RestaurantService._instance);
    });
  }

  _idbProxy;
  _serverProxy;
  _imageService;

  initialize(){
      return new Promise((resolve, reject) => {
          new Promise
              .all([ IdbProxy.instance, ServerProxy.instance, ImageService.instance])
              .then((idbProxy, serverProxy, imageService) => {
                  this._idbProxy = idbProxy;
                  this._serverProxy = serverProxy;
                  this._imageService = imageService;
                  resolve();
              });
      });
  }

  fetchRestaurants() {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurants()
          .then(restaurants => {
              if (restaurants && restaurants.length === 10) {
                  this._imageService.addImageDetails(restaurants)
                      .then(() => resolve(restaurants));
              }
          })
          .then(() => this._serverProxy.fetchRestaurants())
          .then(restaurants => this._idbProxy.saveRestaurants(restaurants))
          .then(() => this._imageService.addImageDetails(restaurants))
          .then(() => resolve(restaurants));
    });
  }

  fetchRestaurantById(id) {
      return new Promise((resolve, reject) => {
          this._idbProxy.getRestaurant(id)
              .then(restaurant => {
                  if (restaurant) {
                      this._imageService.addImageDetail(restaurant)
                          .then(() => resolve(restaurant))
                  }
              })
              .then(() => this._serverProxy.fetchRestaurantById(id))
              .then(restaurant => this._idbProxy.saveRestaurant(restaurant))
              .then(() => this._imageService.addImageDetail(restaurant))
              .then(() => resolve(restaurant));
      });
  }

  fetchNeighborhoods() {
    return new Promise((resolve, reject) => {
      this._idbProxy.getNeighborhoods()
          .then(neighborhoods => {
              if (neighborhoods && neighborhoods.length === 3) {
                  resolve(neighborhoods);
              }
          })
          .then(() => this.fetchRestaurants())
          .then(restaurants => {
              const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
              const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
              resolve(uniqueNeighborhoods);
          });
    });
  }

  fetchCuisines() {
    return new Promise((resolve, reject) => {
      this._idbProxy.getCuisines()
          .then(cuisines => {
              if (cuisines && cuisines.length === 4) {
                  resolve(cuisines);
              }
          })
          .then(() => this.fetchRestaurants())
          .then(restaurants => {
              const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
              const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) === i);
              resolve(uniqueCuisines);
          });
    });
  }

  fetchRestaurantsByCuisine(cuisine) {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurantsByCuisineType(cuisine)
          .then(restaurants => {
              if (restaurants && restaurants.length === 10) {
                  resolve(restaurants);
              }
          })
          .then(() => this.fetchRestaurants())
          .then(restaurants => resolve(restaurants.filter(restaurant => restaurant.cuisine_type === cuisine)));
    });
  }

  fetchRestaurantsByNeighbourhood(neighbourhood) {
    return new Promise((resolve, reject) => {
      this._idbProxy.getRestaurantsByNeighborhood(neighbourhood)
          .then(restaurants => {
              if (restaurants && restaurants.length === 10) {
                  resolve(restaurants);
              }
          })
          .then(() => this.fetchRestaurants())
          .then(restaurants => resolve(restaurants.filter(restaurant => restaurant.neighborhood === neighbourhood)));
    });
  }

  fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    return new Promise((resolve, reject) => {
      if (cuisine && cuisine === 'all') {
        this.fetchRestaurantsByNeighbourhood(neighborhood)
            .then(restaurants => resolve(restaurants))
      }
      if (neighborhood && neighborhood === 'all') {
        this.fetchRestaurantsByCuisine(cuisine)
            .then(restaurants => resolve(restaurants))
      }
      this._idbProxy.getRestaurantsByCuisineTypeAndNeighborhood(cuisine, neighborhood)
          .then(restaurants => {
              if (restaurants && restaurants.length === 10) {
                  resolve(restaurants);
              }
          })
          .then(() =>this.fetchRestaurants())
          .then(restaurants =>
              resolve(
                  restaurants
                      .filter(restaurant => restaurant.neighborhood === neighborhood)
                      .filter(restaurant => restaurant.cuisine_type === cuisine)
              )
          );
    });
  }

    getLiveMessage(neighborhood, cuisine, resultCount){
        return new Promise((resolve, reject) => {
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

            resolve(msg);
        });
    }
}

