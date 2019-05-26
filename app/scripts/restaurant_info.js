import ImageService from './service/image-service';
import MapService from './service/map-service';
import NewReview from './model/new-review';
import RestaurantService from './service/restaurant-service';
import ReviewService from './service/review-service';
import Review from './model/review';


let restaurant;
var newMap;


let restaurantService;
let imageService;
let mapService;
let reviewService;

let customReview;

document.addEventListener('DOMContentLoaded', async () => {
  self.restaurantService = new RestaurantService();
  self.imageService = new ImageService();
  self.mapService = new MapService();
  self.reviewService = new ReviewService();
  await initMap();
});

let initMap = async () => {
  const restaurant = await fetchRestaurantFromURL();
  self.newMap = await self.mapService.initMap(restaurant.latLng.lat, restaurant.latLng.lng, 16);
  await fillBreadcrumb();
  await addMarkerToMap();
};

let addMarkerToMap = async (restaurant = self.restaurant) => {
  const marker = await self.mapService.mapMarkerForRestaurant(restaurant);
  marker.addTo(self.newMap);
};

let fetchRestaurantFromURL = async () => {
  if (self.restaurant) {
    return self.restaurant;
  }

  const id = await getParameterByName('id');
  self.restaurant = await self.restaurantService.fetchRestaurantById(id);
  await fillRestaurantHTML();
  return self.restaurant;
};

let fillRestaurantHTML = async (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisineType;

  const image = document.getElementById('restaurant-img');
  image.src = await self.imageService.imageUrlForRestaurant(restaurant);
  image.srcset = await self.imageService.srcSetForRestaurant(restaurant);
  image.alt = await self.imageService.imageDescriptionForRestaurant(restaurant);
  image.className = 'restaurant-img';
  image.width = '320px';

  if (restaurant.operatingHours) {
    await fillRestaurantHoursHTML();
  }

  await fillReviewsHTML();
};

let fillRestaurantHoursHTML = async (operatingHours = self.restaurant.operatingHours) => {
  const hours = document.getElementById('restaurant-hours');

  const row = await createHeaderRowHTML();
  await hours.appendChild(row);

  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key.substr(1, 1).toUpperCase() + key.substr(2);
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
};

async function createHeaderRowHTML() {
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
  const reviews = await self.reviewService.fetchReviewsByRestaurantId(restaurantId);
  const container = document.getElementById('reviews-container');

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  const ul = document.getElementById('reviews-list');
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  for (const review of reviews) {
    ul.appendChild(await createReviewHTML(review))
  }

  container.appendChild(ul);
};

let createReviewHTML = async (review) => {
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
  date.innerHTML = workingDate.toLocaleDateString('en-CA', {year: 'numeric', month: 'long', day: 'numeric'});
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
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');

  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};

let getParameterByName = async (name, url) => {
  url = !url ? window.location.href : url;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return null;
  }
  return parseInt(decodeURIComponent(results[2].replace(/\+/g, ' ')), 10);
};


/*
 * The following logic drives behaviour of the modal input form.
 * It is an adaptation of https://www.w3schools.com/howto/howto_css_modals.asp
 */
let initializeCustomReview = () => {
  document.getElementById('review-name').value = null;
  document.getElementById('review-rating').value = null;
  document.getElementById('review-comments').value = null;
  self.customReview = new NewReview(self.restaurant.id, null, null, null);
};

let displayReviewForm = () => {
  document.getElementById('add-review-button').style.display = 'none';
  initializeCustomReview();
  validateReview();
  document.getElementById('review-form').style.display = 'block';
};

let validateReview = () => {
  if (self.customReview.name != null && ! self.customReview.isNameValid()){
    document.getElementById('review-name').classList.add('bad-input');
  } else {
    document.getElementById('review-name').classList.remove('bad-input');
  }

  if (self.customReview.rating != null && ! self.customReview.isRatingValid()){
    document.getElementById('review-rating').classList.add('bad-input');
  } else {
    document.getElementById('review-rating').classList.remove('bad-input');
  }

  if (self.customReview.comments != null && ! self.customReview.isCommentsValid()){
    document.getElementById('review-comments').classList.add('bad-input');
  } else {
    document.getElementById('review-comments').classList.remove('bad-input');
  }

  document.getElementById('save-review-button').disabled = ! self.customReview.isValid();
};

let displayToast = async () => {
  const snackbar = document.getElementById('snackbar');
  snackbar.innerHTML = 'Review has been saved';
  snackbar.className = 'show';

  setTimeout(() => {
      snackbar.className = snackbar.className.replace("show", "");
    },
    3000
  );
};

let saveReview = async () => {
  await self.reviewService.saveReview(self.customReview);
  await fillReviewsHTML();
  closeReviewForm();
  await displayToast();
};

let closeReviewForm = () => {
  self.customReview = null;
  document.getElementById('review-form').style.display = 'none';
  document.getElementById('add-review-button').style.display = 'block';
};

let updateReviewName = async (e) => {
  self.customReview.name = e.target.value;
  validateReview();
};

let updateReviewRating = async (e) => {
  self.customReview.rating = e.target.value;
  validateReview();
};

let updateReviewComments = async (e) => {
  self.customReview.comments = e.target.value;
  validateReview();
};

document.getElementById('add-review-button').onclick = () => displayReviewForm();
document.getElementById('close').onclick = () => closeReviewForm();
document.getElementById('clear-review-button').onclick = async () => initializeCustomReview();
document.getElementById('save-review-button').onclick = async () => saveReview();
document.getElementById('review-name').oninput = async (e) => updateReviewName(e);
document.getElementById('review-rating').onchange = async (e) => updateReviewRating(e);
document.getElementById('review-comments').oninput = async (e) => updateReviewComments(e);
