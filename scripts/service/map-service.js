class MapService {
    static _instance;

    /**
     * Static factory method.
     */
    static get instance() {
        if (! MapService._instance) {
            MapService._instance = new MapService();
        }
        return MapService._instance;
    }

    /**
     * Restaurant page URL.
     */
    urlForRestaurant(restaurant) {
        return (`./restaurant.html?id=${restaurant.id}`);
    }

    /**
     * Map marker for a restaurant.
     *
     * See: https://leafletjs.com/reference-1.3.0.html#marker
     */
    mapMarkerForRestaurant(restaurant, map) {
        const coord = [restaurant.latlng.lat, restaurant.latlng.lng];
        const options = {
            title: restaurant.name,
            alt: restaurant.name + ' marker',
            url: this.urlForRestaurant(restaurant)
        };
        const marker = new L.marker(coord, options);
        marker.addTo(newMap);
        return marker;
    }
}
