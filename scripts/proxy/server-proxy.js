const port = 1337;
const DATABASE_URL = `http://localhost:${port}/restaurants`;


/**
 * This class contains all code used to communicate with the backend server over HTTP
 */
class ServerProxy {
    static _instance;

    static get instance() {
        console.log('[server-proxy - instance]');
        return new Promise((resolve, reject) => {
            if (! ServerProxy._instance) {
                ServerProxy._instance = new ServerProxy();
            }
            resolve(ServerProxy._instance);
        });
    }

    fetchRestaurants() {
        console.log('[server-proxy - fetchRestaurants]');
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', DATABASE_URL);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
                reject(`Request failed. Returned status of ${xhr.status}`);
            };
            xhr.send();
        });
    }

    fetchRestaurantById(id) {
        console.log('[server-proxy - fetchRestaurantById]');
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', DATABASE_URL + `?id=${id}`);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
                reject(`Request failed. Returned status of ${xhr.status}`);
            };
            xhr.send();
        });
    }
}
