import RestaurantService from './service/restaurant-service';
import ImageService from './service/image-service';
import MapService from './service/map-service';


let restaurants,
  neighborhoods,
  cuisines;
var newMap;
var markers = [];


let imageService;
let mapService;
let restaurantService;


document.addEventListener('DOMContentLoaded', async () => {
    console.log('[main - addEventListener]');

    self.restaurantService = new RestaurantService();
    self.imageService = new ImageService();
    self.mapService = new MapService();

    await initMap();
    await fetchNeighborhoods();
    await fetchCuisines();
});

let fetchNeighborhoods = async () => {
    console.log('[main - fetchNeighborhoods]');
    self.neighborhoods = await self.restaurantService.fetchNeighborhoods();
    await fillNeighborhoodsHTML();
};

let fillNeighborhoodsHTML = async (neighborhoods = self.neighborhoods) => {
    console.log('[main - fetchNeighborhoodsHTML]');
    const select = document.getElementById('neighborhoods-select');
    neighborhoods.forEach(neighborhood => {
        const option = document.createElement('option');
        option.innerHTML = neighborhood;
        option.value = neighborhood;
        select.append(option);
    });
};

let fetchCuisines = async () => {
    console.log('[main - fetchCuisines]');
    self.cuisines = await self.restaurantService.fetchCuisines();
    await fillCuisinesHTML();
};

let fillCuisinesHTML = async (cuisines = self.cuisines) => {
    console.log('[main - fillCuisinesHTML]');
    const select = document.getElementById('cuisines-select');
    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.innerHTML = cuisine;
        option.value = cuisine;
        select.append(option);
    });
};

let initMap = async () => {
    console.log('[main - initMap]');
    self.newMap = await self.mapService.initMap(40.722216, -73.987501, 12);
    await updateRestaurants();
};

let updateRestaurants = async () => {
    console.log('[main - updateRestaurants]');
    const cSelect = document.getElementById('cuisines-select');
    const nSelect = document.getElementById('neighborhoods-select');
    const lmSelect = document.getElementById('live-message');

    const cIndex = cSelect.selectedIndex;
    const nIndex = nSelect.selectedIndex;

    const cuisine = cSelect[cIndex].value;
    const neighborhood = nSelect[nIndex].value;

    let foundRestaurants = await self.restaurantService.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood);

    await resetRestaurants(foundRestaurants);
    await fillRestaurantsHTML();

    lmSelect.innerHTML = await self.restaurantService.getLiveMessage(neighborhood, cuisine, ! foundRestaurants ? 0 : foundRestaurants.length);
    lmSelect.className = foundRestaurants.length ? 'offscreen' : 'visible';
};

let resetRestaurants = async (restaurants) => {
    console.log('[main - resetRestaurants]');
    self.restaurants = [];
    const ul = document.getElementById('restaurants-list');
    ul.innerHTML = '';

    if (self.markers) {
        for (const marker of self.markers) {
            marker.remove();
        }
    }
    self.markers = [];
    self.restaurants = restaurants;
};

let fillRestaurantsHTML = async (restaurants = self.restaurants) => {
    console.log('[main - fillRestaurantsHTML]');
    const ul = document.getElementById('restaurants-list');

    for (const restaurant of restaurants) {
      ul.append(await createRestaurantHTML(restaurant));
      await addMarkersToMap();
    }
};

let createRestaurantHTML = async (restaurant) => {
    console.log('[main - createRestaurantHTML]');
    const li = document.createElement('li');
    const image = document.createElement('img');

    image.src = await self.imageService.imageUrlForRestaurant(restaurant);
    image.srcset = await self.imageService.srcSetForRestaurant(restaurant);
    image.alt = await self.imageService.imageDescriptionForRestaurant(restaurant);
    image.className = 'restaurant-img';
    li.append(image);

    const name = document.createElement('h3');
    name.innerHTML = restaurant.name;
    li.append(name);

    const neighborhood = document.createElement('p');
    neighborhood.innerHTML = restaurant.neighborhood;
    li.append(neighborhood);

    const address = document.createElement('p');
    address.innerHTML = restaurant.address;
    li.append(address);

    const more = document.createElement('a');
    more.innerHTML = 'View Details';
    more.href = `/restaurant.html?id=${restaurant.id}`;
    more.setAttribute('aria-label', 'View details on ' + restaurant.name);
    li.append(more);

    return li;
};

let addMarkersToMap = async (restaurants = self.restaurants) => {
    console.log('[main - addMarkersToMap]');
    for (const restaurant of restaurants) {
      const marker = await self.mapService.mapMarkerForRestaurant(restaurant);
      marker.addTo(self.newMap);
      marker.on('click', () => window.location.href = marker.options.url);
      self.markers.push(marker);
    }
};

document.getElementById('skip-link').focus();
document.getElementById('neighborhoods-select').onchange = async() => updateRestaurants();
document.getElementById('cuisines-select').onchange = async() => updateRestaurants();
