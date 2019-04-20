let restaurant;
var newMap;


let restaurantService;
let imageService;

document.addEventListener('DOMContentLoaded', () => {
  console.log('[restaurant_info - addEventListener]');
  Promise.all([ RestaurantService.instance, ImageService.instance ])
      .then(services => {
        self.restaurantService = services[0];
        self.imageService = services[1];
      })
      .then(() => initMap())
      .then(map => self.newMap = map);
});

let initMap = () => {
  console.log('[restaurant_info - initMap]');
  return new Promise((resolve, reject) => {
    fetchRestaurantFromURL()
        .then(restaurant => self.mapService.initMap(restaurant.latlng.lat, restaurant.latlng.lng, 16))
        .then(() => fillBreadcrumb())
        .then(() => self.restaurantService.mapMarkerForRestaurant(self.restaurant, self.newMap))
        .then(() => resolve());
  });
};

let fetchRestaurantFromURL = () => {
  console.log('[restaurant_info - fetchRestaurantsFromURL]');
  return new Promise((resolve, reject) => {
    if (self.restaurant) {
      resolve(self.restaurant);
    }

    getParameterByName('id')
        .then(id => self.restaurantService.fetchRestaurantById(id))
        .then(restaurant => self.restaurant = restaurant)
        .then(() => fillRestaurantHTML())
        .then(() => resolve(self.restaurant));
  });
};

let fillRestaurantHTML = (restaurant = self.restaurant) => {
  console.log('[restaurant_info - fillRestaurantHTML]');
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  return Promise
      .all([
        self.imageService.imageUrlForRestaurant(restaurant),
        self.imageService.srcSetForRestaurant(restaurant),
        self.imageService.imageDescriptionForRestaurant(restaurant)
      ])
      .then(values => {
        const image = document.getElementById('restaurant-img');
        image.src = values[0];
        image.srcset = values[1];
        image.alt = values[2];
        image.className = 'restaurant-img';
        image.width = '320px';
      })
      .then(() => {
        if (restaurant.operating_hours) {
          return fillRestaurantHoursHTML();
        }
      })
      .then(() => fillReviewsHTML())
      .then(() => Promise.resolve());
};

let fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  console.log('[restaurant_info - fillRestaurantHoursHTML]');
  const hours = document.getElementById('restaurant-hours');

  return self.createHeaderRowHTML()
      .then(row => hours.appendChild(row))
      .then(() => {
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
      })
      .then(() => Promise.resolve());
};

function createHeaderRowHTML() {
  console.log('[restaurant_info - createHeaderRowHTML]');
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

  return Promise.resolve(r);
}

let fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  console.log('[restaurant_info - fillReviewsHTML]');
  const container = document.getElementById('reviews-container');

  if (! reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return Promise.resolve();
  }

  let promises = [];
  for(const review of reviews) {
    promises.push(createReviewHTML(review));
  }

  const ul = document.getElementById('reviews-list');
  return Promise
      .all(promises)
      .then(reviews => reviews.forEach(review => ul.appendChild(review)))
      .then(() => container.appendChild(ul))
      .then(() => Promise.resolve());
};

let createReviewHTML = (review) => {
  console.log('[restaurant_info - createReviewHTML]');
  const li = document.createElement('li');
  const container = document.createElement('div');

  container.className = 'review-name-date';
  li.appendChild(container);

  const name = document.createElement('h3');
  name.className = 'review-name';
  name.innerHTML = review.name;
  name.setAttribute('aria-label', review.name + ' Review');
  container.appendChild(name);

  const date = document.createElement('div');
  date.className = 'review-date';
  date.innerHTML = review.date;
  container.appendChild(date);

  const rating = document.createElement('div');
  rating.className = 'review-rating';
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('div');
  comments.className = 'review-content';
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return Promise.resolve(li);
};

let fillBreadcrumb = (restaurant = self.restaurant) => {
  console.log('[restaurant_info - fillBreadcrumb]');
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');

  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);

  return Promise.resolve();
};

let getParameterByName = (name, url) => {
  console.log('[restaurant_info - getParameterByName]');
  url = ! url ? window.location.href : url;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (! results) {
    return Promise.resolve(null);
  }
  if (! results[2]) {
    return Promise.resolve('');
  }
  return Promise.resolve(decodeURIComponent(results[2].replace(/\+/g, ' ')));
};
