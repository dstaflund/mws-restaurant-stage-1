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
      const xhr = new XMLHttpRequest();
      xhr.open('GET', DATABASE_URL);
      xhr.onload = () => {
          if (xhr.status === 200) {
              return JSON.parse(xhr.responseText);
          }
          return new Error(`Request failed. Returned status of ${xhr.status}`);
      };
      xhr.send();
  }

  async fetchRestaurantById(id) {
      console.log('[server-proxy - fetchRestaurantById]');
      let xhr = new XMLHttpRequest();
      xhr.open('GET', DATABASE_URL + `?id=${id}`);
      xhr.onload = () => {
          if (xhr.status === 200) {
              return JSON.parse(xhr.responseText);
          }
          return new Error(`Request failed. Returned status of ${xhr.status}`);
      };
      xhr.send();
  }
}
