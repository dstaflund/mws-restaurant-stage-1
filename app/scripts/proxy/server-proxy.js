const port = 1337;
const DB_STEM = `http://localhost:${port}`;
const RESTAURANTS_URL = `${DB_STEM}/restaurants`;
const REVIEWS_URL = `${DB_STEM}/reviews`;


/**
 * This class contains all code used to communicate with the backend server over HTTP
 */
export default class ServerProxy {

  constructor(){
  }

  async fetchRestaurants() {
    console.log('ServerProxy - fetchRestaurants]');
      const response = await fetch(RESTAURANTS_URL);
      if (response.status === 200) {
        return await response.json();
      }
      return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async fetchRestaurantById(restaurantId) {
    console.log('ServerProxy - fetchRestaurantById(' + restaurantId + ')]');
    const response = await fetch(`${RESTAURANTS_URL}/${restaurantId}`);
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async updateRestaurantFavoriteStatus(restaurantId, favoriteInd){
    console.log('ServerProxy - updateRestaurantFavoriteStatus(' + restaurantId + ', ' + favoriteInd + ')]');
    const response = await fetch(`${RESTAURANTS_URL}/${restaurantId}/?is_favorite=${favoriteInd}`, { method: 'put' });
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async fetchReviews(){
    console.log('ServerProxy - fetchReviews]');
    const response = await fetch(REVIEWS_URL);
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async fetchReviewsByRestaurantId(restaurantId){
    console.log('ServerProxy - fetchReviewsByRestaurantId(' + restaurantId + ')]');
    const response = await fetch(`${REVIEWS_URL}/?restaurant_id=${restaurantId}`);
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async fetchReviewById(reviewId){
    console.log('ServerProxy - fetchReviewById(' + reviewId + ')]');
    const response = await fetch(`${REVIEWS_URL}/${reviewId}`);
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async saveReview(review){
    console.log('ServerProxy - saveReview]');
    console.log(review);
    const response = await fetch(REVIEWS_URL, { method: 'post', body: JSON.stringify(review) });
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async updateReview(review){
    console.log('ServerProxy - updateReview]');
    console.log(review);
    const response = await fetch(`${REVIEWS_URL}/${review.id}`, { method: 'put', body: JSON.stringify(review) });
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }

  async deleteReview(reviewId){
    console.log('ServerProxy - deleteReview(' + reviewId + ')]');
    const response = await fetch(`${REVIEWS_URL}/${reviewId}`, { method: 'delete' });
    if (response.status === 200) {
      return await response.json();
    }
    return new Error(`Request failed. Returned status of ${response.status} and message of ${response.statusText}`);
  }
}
