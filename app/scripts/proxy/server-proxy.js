const port = 1337;
const DATABASE_URL = `http://localhost:${port}/restaurants`;


/**
 * This class contains all code used to communicate with the backend server over HTTP
 */
export default class ServerProxy {

  constructor(){
  }

  async fetchRestaurants() {
      const response = await fetch(DATABASE_URL);
      if (response.status === 200) {
        return await response.json();
      }
      return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async fetchRestaurantById(id) {
    const response = await fetch(DATABASE_URL + `?id=${id}`);
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }
}
