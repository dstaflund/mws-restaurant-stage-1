import RestaurantService from './service/restaurant-service';
import ImageService from './service/image-service';
import MapService from './service/map-service';
import ReviewService from "./service/review-service";
import NetworkMonitor from "./service/network-monitor";


let restaurants,
  neighborhoods,
  cuisines;
var newMap;
var markers = [];

let imageService;
let mapService;
let restaurantService;
let reviewService;
let networkMonitor;

document.addEventListener('DOMContentLoaded', async () => {
  self.restaurantService = RestaurantService.getInstance();
  self.reviewService = ReviewService.getInstance();
  self.imageService = new ImageService();
  self.mapService = new MapService();
  self.networkMonitor = NetworkMonitor.getInstance();

  self.networkMonitor.registerRestaurantService(self.restaurantService);
  self.networkMonitor.registerReviewService(self.reviewService);
  self.networkMonitor.addEventListeners();
  self.networkMonitor.registerOnlineCallback(onlineCallback);
  self.networkMonitor.registerOfflineCallback(offlineCallback);

  if (self.networkMonitor.isOnline()) {
    await self.restaurantService.syncFavorites();
    await self.reviewService.syncReviews();
  }

  await initMap();
  await fetchNeighborhoods();
  await fetchCuisines();
});

let onlineCallback = async() => {
  alert('You are now back online.  Favorites and reviews you created while offline will now be sent to the server.');
};

let offlineCallback = async() => {
  alert('You are now offline.  Favorites and reviews you create while offline will be sent to the server once you are back online.');
};

let fetchNeighborhoods = async () => {
  self.neighborhoods = await self.restaurantService.fetchNeighborhoods();
  await fillNeighborhoodsHTML();
};

let fillNeighborhoodsHTML = async (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

let fetchCuisines = async () => {
  self.cuisines = await self.restaurantService.fetchCuisines();
  await fillCuisinesHTML();
};

let fillCuisinesHTML = async (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};

let initMap = async () => {
  self.newMap = await self.mapService.initMap(40.722216, -73.987501, 12);
  await updateRestaurants();
};

let updateRestaurants = async () => {
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

  lmSelect.innerHTML = await getLiveMessage(neighborhood, cuisine, !foundRestaurants ? 0 : foundRestaurants.length);
  lmSelect.className = foundRestaurants.length ? 'offscreen' : 'visible';
};

let resetRestaurants = async (restaurants) => {
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
  const ul = document.getElementById('restaurants-list');

  for (const restaurant of restaurants) {
    ul.append(await createRestaurantHTML(restaurant));
    await addMarkersToMap();
  }
};

let createRestaurantHTML = async (restaurant) => {
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

  const favorite = document.createElement('input');
  favorite.id = 'favorite_' + restaurant.id;
  favorite.type = 'image';
  favorite.alt = 'Favorite toggle (Currently ' + (restaurant.isFavorite ? 'true' : 'false') + ')';
  favorite.src = 'images/icons/baseline-favorite' + (restaurant.isFavorite ? '-24px.svg' : '_border-24px.svg');
  favorite.setAttribute('role', 'button');
  favorite.setAttribute('aria-label', restaurant.name + 'is Favorite');
  favorite.setAttribute('aria-pressed', (restaurant.isFavorite === true ? 'true' : 'false'));
  favorite.onclick = async () => toggleFavorite(restaurant, favorite);
  li.append(favorite);

  return li;
};

let toggleFavorite = async (restaurant, element) => {
  const newFavoriteInd = await self.restaurantService.toggleFavoriteIndicator(restaurant.id);

  const snackbar = document.getElementById('snackbar');
  snackbar.className = 'show';

  switch (newFavoriteInd) {
    case true:
      element.src = 'images/icons/baseline-favorite-24px.svg';
      element.alt = 'Favorite toggle (Currently true)';
      element.setAttribute('aria-pressed', 'true');
      snackbar.innerHTML = restaurant.name + ' is a favorite restaurant';
      break;

    case false:
      element.src = 'images/icons/baseline-favorite_border-24px.svg';
      element.alt = 'Favorite toggle (Currently false)';
      element.setAttribute('aria-pressed', 'false');
      snackbar.innerHTML = restaurant.name + ' is not a favorite restaurant';
      break;
  }

  setTimeout(() => {
      snackbar.className = snackbar.className.replace("show", "");
    },
    3000
  );
};

let addMarkersToMap = async (restaurants = self.restaurants) => {
  for (const restaurant of restaurants) {
    const marker = await self.mapService.mapMarkerForRestaurant(restaurant);
    marker.addTo(self.newMap);
    marker.on('click', () => window.location.href = marker.options.url);
    self.markers.push(marker);
  }
};

let getLiveMessage = async (neighborhood, cuisine, resultCount) => {
  let msg;

  switch (resultCount) {
    case 0:
      msg = 'No restaurants found ';
      break;

    case 1:
      msg = '1 restaurant found ';
      break;

    default:
      msg = resultCount + ' restaurants found ';
  }

  msg += cuisine === 'all' ? '' : cuisine === 'Pizza' ? 'serving pizza ' : 'serving ' + cuisine + ' cuisine ';
  msg += neighborhood === 'all' ? '' : 'in ' + neighborhood;

  return msg;
};

document.getElementById('neighborhoods-select').onchange = async () => updateRestaurants();
document.getElementById('cuisines-select').onchange = async () => updateRestaurants();
document.getElementById('skip-link').focus();
