import IdbProxy from './idb-proxy';
import ImageDetailConverter from '../converter/image-detail-converter';
import RestaurantConverter from '../converter/restaurant-converter';
import ReviewConverter from '../converter/review-converter';
import SyncFavoriteConverter from "../converter/sync-favorite-converter";
import SyncReviewConverter from "../converter/sync-review-converter";


export default class IdbProxyAgent {
  _idbProxy;
  _imageDetailConverter;
  _restaurantConverter;
  _reviewConverter;
  _syncFavoriteConverter;
  _syncReviewConverter;

  constructor() {
    this._idbProxy = new IdbProxy();
    this._imageDetailConverter = new ImageDetailConverter();
    this._restaurantConverter = new RestaurantConverter();
    this._reviewConverter = new ReviewConverter();
    this._syncFavoriteConverter = new SyncFavoriteConverter();
    this._syncReviewConverter = new SyncReviewConverter();
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

  async updateRestaurant(restaurant) {
    await this._idbProxy.updateRestaurant(this._restaurantConverter.toIdb(restaurant));
  }

  async getImageDetails(photograph) {
    const imageDetails = await this._idbProxy.getImageDetails(photograph);
    return this._imageDetailConverter.fromIdb(imageDetails);
  }

  async getReviews() {
    const reviews = await this._idbProxy.getReviews();
    return reviews == null
      ? null
      : reviews.map(review => this._reviewConverter.fromIdb(review));
  }

  async getReviewById(reviewId) {
    const review = await this._idbProxy.getReviewById(reviewId);
    return this._reviewConverter.fromIdb(review);
  }

  async getReviewsByRestaurantId(restaurantId) {
    const reviews = await this._idbProxy.getReviewsByRestaurantId(restaurantId);
    return reviews == null
      ? null
      : reviews.map(review => this._reviewConverter.fromIdb(review));
  }

  async saveReviews(reviews, cachedReviews) {
    const cachedReviewIds = cachedReviews.map(review => review.id);
    const convertedReviews = reviews.map(review => this._reviewConverter.toIdb(review));
    await this._idbProxy.saveReviews(convertedReviews, cachedReviewIds);
  }

  async saveReview(review) {
    const convertedReview = this._reviewConverter.toIdb(review);
    return await this._idbProxy.saveReview(convertedReview);
  }

  async getSyncFavorites(){
    const syncFavorites = await this._idbProxy.getSyncFavorites();
    return syncFavorites == null
      ? null
      : syncFavorites.map(syncFavorite => this._syncFavoriteConverter.fromIdb(syncFavorite));
  }

  async getSyncFavorite(restaurantId){
    const syncFavorite = await this._idbProxy.getSyncFavorite(restaurantId);
    return this._syncFavoriteConverter.fromIdb(syncFavorite);
  }

  async saveSyncFavorite(syncFavorite){
    const existingFavorite = await this.getSyncFavorite(syncFavorite.restaurantId);
    if (! existingFavorite) {
      await this._idbProxy.saveSyncFavorite(this._syncFavoriteConverter.toIdb(syncFavorite));
    } else {
      existingFavorite.favoriteInd = syncFavorite.favoriteInd;
      await this._idbProxy.updateSyncFavorite(this._syncFavoriteConverter.toIdb(existingFavorite));
    }
  }

  async deleteSyncFavorite(syncFavorite){
    await this._idbProxy.deleteSyncFavorite(syncFavorite.restaurantId);
  }

  async getSyncReviews(){
    const syncReviews = await this._idbProxy.getSyncReviews();
    return syncReviews == null
      ? null
      : syncReviews.map(syncReview => this._syncReviewConverter.fromIdb(syncReview));
  }

  async getSyncReviewsAsReviews(){
    const syncReviews = await this.getSyncReviews();
    let reviews = [];
    syncReviews.forEach(syncReview => reviews.push(this._reviewConverter.fromNewReview(syncReview.newReview)));
    return reviews;
  }

  async saveSyncReview(syncReview){
    await this._idbProxy.saveSyncReview(this._syncReviewConverter.toIdb(syncReview));
    return this._reviewConverter.fromNewReview(syncReview.newReview);
  }

  async deleteSyncReview(syncReview){
    await this._idbProxy.deleteSyncReview(syncReview.hash);
  }
}
