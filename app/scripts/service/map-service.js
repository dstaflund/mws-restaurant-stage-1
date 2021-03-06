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


export default class MapService {

  constructor() {
  }

  async urlForRestaurant(restaurant) {
    return `./restaurant.html?id=${restaurant.id}`;
  }

  async mapMarkerForRestaurant(restaurant) {
    const coord = [restaurant.latLng.lat, restaurant.latLng.lng];
    const options = {
      title: restaurant.name,
      alt: restaurant.name + ' marker',
      url: await this.urlForRestaurant(restaurant)
    };
    return new L.marker(coord, options);
  }

  async initMap(lat, lng, zoom) {
    const mapOptions = {center: [lat, lng], zoom: zoom, scrollWheelZoom: false};
    const newMap = L.map('map', mapOptions);
    await this.addTileLayerToMap(newMap);
    return newMap;
  }

  async addTileLayerToMap(map) {
    L.tileLayer(layerUrl, layerOptions).addTo(map);
  }
}
