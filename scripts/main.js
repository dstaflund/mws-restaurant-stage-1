let restaurants,
  neighborhoods,
  cuisines;
var newMap;
var markers = [];


let imageService;
let mapService;
let restaurantService;


document.addEventListener('DOMContentLoaded', () => {
    console.log('[main - addEventListener]');
    Promise
        .all([RestaurantService.instance, ImageService.instance, MapService.instance])
        .then(services => {
            self.restaurantService = services[0];
            self.imageService = services[1];
            self.mapService = services[2];
        })
        .then(() => initMap())
        .then(() => fetchNeighborhoods())
        .then(() => fetchCuisines())
        .catch(error => console.error(error));
});

let fetchNeighborhoods = () => {
    console.log('[main - fetchNeighborhoods]');
    return new Promise((resolve, reject) => {
        self.restaurantService.fetchNeighborhoods()
            .then(neighborhoods => self.neighborhoods = neighborhoods)
            .then(() => fillNeighborhoodsHTML())
            .then(() => resolve());
    });
};

let fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
    console.log('[main - fetchNeighborhoodsHTML]');
    return new Promise((resolve, reject) => {
        const select = document.getElementById('neighborhoods-select');
        neighborhoods.forEach(neighborhood => {
            const option = document.createElement('option');
            option.innerHTML = neighborhood;
            option.value = neighborhood;
            select.append(option);
        });
        resolve();
    });
};

let fetchCuisines = () => {
    console.log('[main - fetchCuisines]');
    return new Promise((resolve, reject) => {
        self.restaurantService.fetchCuisines()
            .then(cuisines => self.cuisines = cuisines)
            .then(() => fillCuisinesHTML())
            .then(() => resolve());
    });
};

let fillCuisinesHTML = (cuisines = self.cuisines) => {
    console.log('[main - fillCuisinesHTML]');
    return new Promise((resolve, reject) => {
        const select = document.getElementById('cuisines-select');
        cuisines.forEach(cuisine => {
            const option = document.createElement('option');
            option.innerHTML = cuisine;
            option.value = cuisine;
            select.append(option);
        });
        resolve();
    });
};

let initMap = () => {
    console.log('[main - initMap]');
    return new Promise((resolve, reject) => {
        self.mapService.initMap(40.722216, -73.987501, 12)
            .then(map => self.newMap = map)
            .then(() => updateRestaurants())
            .then(() => resolve());
    });
};

let updateRestaurants = () => {
    console.log('[main - updateRestaurants]');
    return new Promise((resolve, reject) => {
        const cSelect = document.getElementById('cuisines-select');
        const nSelect = document.getElementById('neighborhoods-select');
        const lmSelect = document.getElementById('live-message');

        const cIndex = cSelect.selectedIndex;
        const nIndex = nSelect.selectedIndex;

        const cuisine = cSelect[cIndex].value;
        const neighborhood = nSelect[nIndex].value;

        let foundRestaurants;

        self.restaurantService.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood)
            .then(restaurants => foundRestaurants = restaurants)
            .then(() => resetRestaurants(foundRestaurants))
            .then(() => fillRestaurantsHTML())
            .then(() => self.restaurantService.getLiveMessage(neighborhood, cuisine, ! foundRestaurants ? 0 : foundRestaurants.length))
            .then(message => {
                lmSelect.innerHTML = message;
                lmSelect.className = foundRestaurants.length ? 'offscreen' : 'visible';
                resolve();
            });
    });
};

let resetRestaurants = (restaurants) => {
    console.log('[main - resetRestaurants]');
    return new Promise((resolve, reject) => {
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
        resolve();
    });
};

let fillRestaurantsHTML = (restaurants = self.restaurants) => {
    console.log('[main - fillRestaurantsHTML]');
    return new Promise((resolve, reject) => {
        const ul = document.getElementById('restaurants-list');

        let promises = [];
        for (const restaurant of restaurants) {
            promises.push(createRestaurantHTML(restaurant));
        }

        new Promise.all(promises)
            .then(results => results.forEach(result => ul.append(result)))
            .then(() => addMarkersToMap())
            .then(() => resolve());
    });
};

let createRestaurantHTML = (restaurant) => {
    console.log('[main - createRestaurantHTML]');
    return new Promise((resolve, reject) => {
        const li = document.createElement('li');
        const image = document.createElement('img');

        self.imageService.imageUrlForRestaurant(restaurant)
            .then(src => image.src = src)
            .then(() => self.imageService.srcSetForRestaurant(restaurant))
            .then(srcset => image.srcset = srcset)
            .then(() => self.imageService.imageDescriptionForRestaurant(restaurant))
            .then(alt => image.alt = alt)
            .then(() => {
                image.className = 'restaurant-img';
                li.append(image);
            })
            .then(() => {
                const name = document.createElement('h3');
                name.innerHTML = restaurant.name;
                li.append(name);
            })
            .then(() => {
                const neighborhood = document.createElement('p');
                neighborhood.innerHTML = restaurant.neighborhood;
                li.append(neighborhood);
            })
            .then(() => {
                const address = document.createElement('p');
                address.innerHTML = restaurant.address;
                li.append(address);
            })
            .then(() => self.restaurantService.urlForRestaurant(restaurant))
            .then(url => {
                const more = document.createElement('a');
                more.innerHTML = 'View Details';
                more.href = url;
                more.setAttribute('aria-label', 'View details on ' + restaurant.name);
                li.append(more);
            })
            .then(() => resolve(li));
    });
};

let addMarkersToMap = (restaurants = self.restaurants) => {
    console.log('[main - addMarkersToMap]');
    return new Promise((resolve, reject) => {
        let promises = [];
        for (const restaurant of restaurants) {
            promises.push(self.restaurantService.mapMarkerForRestaurant(restaurant));
        }
        new Promise.all(promises)
            .then(markers => {
                markers.forEach(marker => {
                    marker.addTo(self.newMap);
                    marker.on('click', onClick);

                    function onClick() {
                        window.location.href = marker.options.url;
                    }

                    self.markers.push(marker);
                });
            })
            .then(() => resolve());
    });
};

document.getElementById('skip-link').focus();

