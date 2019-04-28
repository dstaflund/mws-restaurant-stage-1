const port = 1337;
const DATABASE_URL = `http://localhost:${port}/restaurants`;


/**
 * This class contains all code used to communicate with the backend server over HTTP
 */
export default class ServerProxy {

  constructor(){
  }

  async fetchRestaurants() {
      console.log('[server-proxy - fetchRestaurants]');
      const response = await fetch(DATABASE_URL);
      if (response.status === 200) {
        const restaurants = await response.json();
        console.log('fetched the following restaurants from the network...');
        console.log(restaurants);
        return restaurants;
      }
      return new Error(`Request failed. Returned status of ${xhr.status}`);
  }

  async fetchRestaurantById(id) {
    console.log('[server-proxy - fetchRestaurantById]');
    const response = await fetch(DATABASE_URL + `?id=${id}`);
    if (response.status === 200) {
      const restaurant = await response.json();
      console.log('fetched the following restaurant from the network...');
      console.log(restaurant);
      return restaurant;
    }
    return new Error(`Request failed. Returned status of ${xhr.status}`);
  }
}
