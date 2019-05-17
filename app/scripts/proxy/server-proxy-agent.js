import NewReviewConverter from '../converter/new-review-converter';
import RestaurantConverter from '../converter/restaurant-converter';
import ReviewConverter from '../converter/review-converter';
import ServerProxy from './server-proxy';


export default class ServerProxyAgent {
  _newReviewConverter;
  _restaurantConverter;
  _reviewConverter;
  _serverProxy;

  constructor() {
    this._newReviewConverter = new NewReviewConverter();
    this._restaurantConverter = new RestaurantConverter();
    this._reviewConverter = new ReviewConverter();
    this._serverProxy = new ServerProxy();
  }

  async fetchRestaurants() {
    const restaurants = await this._serverProxy.fetchRestaurants();
    return restaurants == null
      ? null
      : restaurants.map(restaurant => this._restaurantConverter.fromServer(restaurant));
  }

  async fetchRestaurantById(restaurantId) {
    const restaurant = await this._serverProxy.fetchRestaurantById(restaurantId);
    return this._restaurantConverter.fromServer(restaurant);
  }

  async updateRestaurantFavoriteStatus(restaurantId, favoriteInd) {
    await this._serverProxy.updateRestaurantFavoriteStatus(restaurantId, favoriteInd);
  }

  async fetchReviews() {
    const reviews = await this._serverProxy.fetchReviews();
    return reviews == null
      ? null
      : reviews.map(review => this._reviewConverter.fromServer(review));
  }

  async fetchReviewsByRestaurantId(restaurantId) {
    const reviews = await this._serverProxy.fetchReviewsByRestaurantId(restaurantId);
    return reviews == null
      ? null
      : reviews.map(review => this._reviewConverter.fromServer(review));
  }

  async fetchReviewById(reviewId) {
    const review = await this._serverProxy.fetchReviewById(reviewId);
    return this._reviewConverter.fromServer(review);
  }

  async saveReview(review) {
    console.log('[server-agent-proxy - saveReview]');
    console.log('[server-agent-proxy - saveReview] review =');
    console.log(review);
    const convertedReview = await this._newReviewConverter.toServer(review);
    console.log('[server-agent-proxy - saveReview] convertedReview =');
    console.log(convertedReview);
    const createdReview = await this._serverProxy.saveReview(convertedReview);
    console.log('[server-agent-proxy - saveReview] createdReview =');
    console.log(createdReview);
    const response = await this._reviewConverter.fromServer(createdReview);
    console.log('[server-agent-proxy - saveReview] response =');
    console.log(response);
    return response;
  }

  async updateReview(review) {
    const convertedReview = await this._reviewConverter.toServer(review);
    await this._serverProxy.updateReview(convertedReview);
  }

  async deleteReview(reviewId) {
    await this._serverProxy.deleteReview(reviewId);
  }
}
