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
        return await response.json();
      }
      return new Error(`Request failed. Returned status of ${xhr.status}`);
  }

  fetchRestaurantByIdUri(id) {
    return DATABASE_URL + `?id=${id}`;
  }

  async fetchRestaurantById(id) {
    console.log('[server-proxy - fetchRestaurantById]');
    const response = this.fetchRestaurantByIdUri(id);
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${xhr.status}`);
  }
}
