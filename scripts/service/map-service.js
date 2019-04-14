class MapService {
    static _instance;

    static get instance() {
        return new Promise((resolve, reject) => {
            if (! MapService._instance) {
                MapService._instance = new MapService();
                resolve(MapService._instance);
            }
            resolve(MapService._instance);
        });
    }

    urlForRestaurant(restaurant) {
        return new Promise((resolve, reject) => {
            resolve(`./restaurant.html?id=${restaurant.id}`);
        });
    }

    mapMarkerForRestaurant(restaurant) {
        return new Promise((resolve, reject) => {
            const coord = [restaurant.latlng.lat, restaurant.latlng.lng];
            const options = {
                title: restaurant.name,
                alt: restaurant.name + ' marker',
                url: this.urlForRestaurant(restaurant)
            };
            resolve(new L.marker(coord, options));
        });
    }
}
