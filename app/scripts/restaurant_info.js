import ImageService from './service/image-service';
import MapService from './service/map-service';
import RestaurantService from './service/restaurant-service';
import ReviewService from './service/review-service';


let restaurant;
var newMap;


let restaurantService;
let imageService;
let mapService;
let reviewService;

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[restaurant-info - ]');
  self.restaurantService = new RestaurantService();
  self.imageService = new ImageService();
  self.mapService = new MapService();
  self.reviewService = new ReviewService();
  await initMap();
});

let initMap = async () => {
  console.log('[restaurant-info - initMap]');
  const restaurant = await fetchRestaurantFromURL();
  self.newMap = await self.mapService.initMap(restaurant.latLng.lat, restaurant.latLng.lng, 16);
  await fillBreadcrumb();
  await addMarkerToMap();
};

let addMarkerToMap = async (restaurant = self.restaurant) => {
  console.log('[restaurant-info - addMarkerToMap]');
  const marker = await self.mapService.mapMarkerForRestaurant(restaurant);
  marker.addTo(self.newMap);
};

let fetchRestaurantFromURL = async () => {
  console.log('[restaurant-info - fetchRestaurantFromURL]');
  if (self.restaurant) {
    return self.restaurant;
  }

  const id = await getParameterByName('id');
  self.restaurant = await self.restaurantService.fetchRestaurantById(id);
  await fillRestaurantHTML();
  return self.restaurant;
};

let fillRestaurantHTML = async (restaurant = self.restaurant) => {
  console.log('[restaurant-info - fillRestaurantHTML]');
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  const image = document.getElementById('restaurant-img');
  image.src = await self.imageService.imageUrlForRestaurant(restaurant);
  image.srcset = await self.imageService.srcSetForRestaurant(restaurant);
  image.alt = await self.imageService.imageDescriptionForRestaurant(restaurant);
  image.className = 'restaurant-img';
  image.width = '320px';

  if (restaurant.operating_hours) {
    await fillRestaurantHoursHTML();
  }

  await fillReviewsHTML();
};

let fillRestaurantHoursHTML = async (operatingHours = self.restaurant.operating_hours) => {
  console.log('[restaurant-info - fillRestaurantHoursHTML]');
  const hours = document.getElementById('restaurant-hours');

  const row = await createHeaderRowHTML();
  await hours.appendChild(row);

  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
};

async function createHeaderRowHTML() {
  console.log('[restaurant-info - createHeaderRowHTML]');
  const r = document.createElement('tr');
  r.className = 'header-row';

  const d = document.createElement('th');
  d.innerHTML = 'Day';
  d.scope = 'col';
  r.appendChild(d);

  const t = document.createElement('th');
  t.innerHTML = 'Hours of Operation';
  t.scope = 'col';
  r.appendChild(t);

  return r;
}

let fillReviewsHTML = async (restaurantId = self.restaurant.id) => {
  console.log('[restaurant-info - fillReviewsHTML]');
  const reviews = await self.reviewService.fetchReviewsByRestaurantId(restaurantId);
  const container = document.getElementById('reviews-container');

  if (! reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  const ul = document.getElementById('reviews-list');

  for(const review of reviews) {
    ul.appendChild(await createReviewHTML(review))
  }

  container.appendChild(ul);
};

let createReviewHTML = async (review) => {
  console.log('[restaurant-info - createReviewHTML]');
  const li = document.createElement('li');
  const container = document.createElement('div');

  container.className = 'review-name-date';
  li.appendChild(container);

  const name = document.createElement('h3');
  name.className = 'review-name';
  name.innerHTML = review.name;
  name.setAttribute('aria-label', review.name + ' Review');
  container.appendChild(name);

  const workingDate = new Date(Math.max(review.createdAt, review.updatedAt));
  const date = document.createElement('div');
  date.className = 'review-date';
  date.innerHTML = workingDate.toLocaleDateString('en-CA', { year: 'isNumeric', month: 'long', day: 'isNumeric'});
  container.appendChild(date);

  const rating = document.createElement('div');
  rating.className = 'review-rating';
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('div');
  comments.className = 'review-content';
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
};

let fillBreadcrumb = async (restaurant = self.restaurant) => {
  console.log('[restaurant-info - fillBreadcrumb]');
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');

  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};

let getParameterByName = async (name, url) => {
  console.log('[restaurant-info - getParameterByName]');
  url = ! url ? window.location.href : url;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (! results) {
    return null;
  }
  if (! results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
