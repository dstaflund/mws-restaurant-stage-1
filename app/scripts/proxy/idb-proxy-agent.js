import IdbProxy from './idb-proxy';
import ImageDetailConverter from '../converter/image-detail-converter';
import RestaurantConverter from '../converter/restaurant-converter';
import ReviewConverter from '../converter/review-converter';


export default class IdbProxyAgent {
  _idbProxy;
  _imageDetailConverter;
  _restaurantConverter;
  _reviewConverter;

  constructor(){
    this._idbProxy = new IdbProxy();
    this._imageDetailConverter = new ImageDetailConverter();
    this._restaurantConverter = new RestaurantConverter();
    this._reviewConverter = new ReviewConverter();
  }

  async getRestaurants() {
    const restaurants = await this._idbProxy.getRestaurants();
    return restaurants == null
      ? null
      : restaurants.map(restaurant => this._restaurantConverter.fromIdb(restaurant));
  }

  async getRestaurantsByNeighborhood(neighborhood) {
    const restaurants = await this._idbProxy.getRestaurantsByNeighborhood(neighborhood);
    return restaurants == null
      ? null
      : restaurants.map(restaurant => this._restaurantConverter.fromIdb(restaurant));
  }

  async getRestaurantsByCuisineType(cuisineType) {
    const restaurants = await this._idbProxy.getRestaurantsByCuisineType(cuisineType);
    return restaurants == null
      ? null
      : restaurants.map(restaurant => this._restaurantConverter.fromIdb(restaurant));
  }

  async getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood) {
    const restaurants = await this._idbProxy.getRestaurantsByCuisineTypeAndNeighborhood(cuisineType, neighborhood);
    return restaurants == null
      ? null
      : restaurants.map(restaurant => this._restaurantConverter.fromIdb(restaurant));
  }

  async getRestaurant(restaurantId) {
    const restaurant = await this._idbProxy.getRestaurant(restaurantId);
    return this._restaurantConverter.fromIdb(restaurant);
  }

  async saveRestaurants(restaurants, cachedRestaurants) {
    const convertedRestaurants = restaurants.map(restaurant => this._restaurantConverter.toIdb(restaurant));
    const cachedRestaurantIds = cachedRestaurants.map(restaurant => restaurant.id);
    await this._idbProxy.saveRestaurants(convertedRestaurants, cachedRestaurantIds);
  }

  async saveRestaurant(restaurant) {
    await this._idbProxy.saveRestaurant(this._restaurantConverter.toIdb(restaurant));
  }

  async updateRestaurant(restaurant){
    await this._idbProxy.updateRestaurant(this._restaurantConverter.toIdb(restaurant));
  }

  async getImageDetails(photograph){
    const imageDetails = await this._idbProxy.getImageDetails(photograph);
    return this._imageDetailConverter.fromIdb(imageDetails);
  }

  async getNeighborhoods() {
    return await this._idbProxy.getNeighborhoods();
  }

  async getCuisines() {
    return await this._idbProxy.getCuisines();
  }

  async getReviews(){
    const reviews = await this._idbProxy.getReviews();
    return reviews == null
      ? null
      : reviews.map(review => this._reviewConverter.fromIdb(review));
  }

  async getReviewById(reviewId){
    const review = await this._idbProxy.getReviewById(reviewId);
    return this._reviewConverter.fromIdb(review);
  }

  async getReviewsByRestaurantId(restaurantId){
    const reviews = await this._idbProxy.getReviewsByRestaurantId(restaurantId);
    return reviews == null
      ? null
      : reviews.map(review => this._reviewConverter.fromIdb(review));
  }

  async saveReviews(reviews, cachedReviews){
    const cachedReviewIds = cachedReviews.map(review => review.id);
    const convertedReviews = reviews.map(review => this._reviewConverter.toIdb(review));
    await this._idbProxy.saveReviews(convertedReviews, cachedReviewIds);
  }

  async saveReview(review){
    console.log('[idb-proxy-agent - saveReview]');
    console.log('[idb-proxy-agent - saveReview]  review = ');
    console.log(review);
    const convertedReview = this._reviewConverter.toIdb(review);
    console.log('[idb-proxy-agent - saveReview]  convertedReview = ');
    console.log(convertedReview);
    const response = this._idbProxy.saveReview(convertedReview);
    console.log('[idb-proxy-agent - saveReview]  response = ');
    console.log(response);
    return response
  }

  async updateReview(review){
    const convertedReview = this._reviewConverter.toIdb(review);
    await this._idbProxy.updateReview(convertedReview);
  }

  async deleteReview(reviewId){
    await this._idbProxy.deleteReview(reviewId);
  }

}
