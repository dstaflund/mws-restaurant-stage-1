const maxZoom = 18;
const layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}';
const mapToken = 'pk.eyJ1IjoiZHN0YWZsdW5kIiwiYSI6ImNqc2kzaml2cDBoM3o0NG56ZzhndmU4YjUifQ.AMO6QC2-9_sXKD4JZm3Ylg';

const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/" title="The free wiki world map">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/" title="Attribution-ShareAlike 2.0 Generic license">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/" title="An open source mapping platform for custom designed maps">Mapbox</a>';

const layerOptions = {
    mapboxToken: mapToken,
    maxZoom: maxZoom,
    attribution: attribution,
    id: 'mapbox.streets'
};



class MapService {
    static _instance;

    static get instance() {
        console.log('[map-service - instance]');
        return new Promise((resolve, reject) => {
            if (! MapService._instance) {
                MapService._instance = new MapService();
                resolve(MapService._instance);
            }
            resolve(MapService._instance);
        });
    }

    urlForRestaurant(restaurant) {
        console.log('[map-service - urlForRestaurant]');
        return new Promise((resolve, reject) => {
            resolve(`./restaurant.html?id=${restaurant.id}`);
        });
    }

    mapMarkerForRestaurant(restaurant) {
        console.log('[map-service - mapMarkerForRestaurant]');
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

    initMap(lat, lng, zoom) {
        console.log('[map-service - initMap]');
        return new Promise((resolve, reject) => {
            const mapOptions = { center: [lat, lng], zoom: zoom, scrollWheelZoom: false };
            const newMap = L.map('map', mapOptions);
            this.addTileLayerToMap(newMap).then(() => resolve(newMap));
        });
    }

    addTileLayerToMap(map){
        console.log('[map-service - addTileLayerToMap]');
        return new Promise((resolve, reject) => {
            L.tileLayer(layerUrl, layerOptions).addTo(map);
            resolve();
        });
    }
}
