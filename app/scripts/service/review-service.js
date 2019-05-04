import IdbProxy from '../proxy/idb-proxy';
import ServerProxy from '../proxy/server-proxy';
import ImageService from '../service/image-service';


export default class ReviewService {
  _idbProxy;
  _serverProxy;

  constructor(){
    this._idbProxy = new IdbProxy();
    this._serverProxy = new ServerProxy();
  }

  async fetchReviews() {
    console.log('[ReviewService - fetchReviews]');
    const cachedReviews = await this._idbProxy.getReviews();
    if (cachedReviews && this.allOriginalReviewsInDb()) {
      return cachedReviews;
    }
    const reviews = await this._serverProxy.fetchReviews();
    await this._idbProxy.saveReviews(reviews, cachedReviews);
    return reviews;
  }

  // TODO
  allOriginalReviewsInDb(){
    console.log('[ReviewService - allOriginalReviewsInDb]');
    return false;
  }

  async fetchReviewsByRestaurantId(restaurantId) {
    console.log('[ReviewService - fetchReviewsByRestaurantId(' + restaurantId + ')]');
    let reviews = await this._idbProxy.getReviewsByRestaurantId(restaurantId);
    if (reviews) {
      return reviews;
    }
    reviews = await this._serverProxy.fetchReviewsByRestaurantId(restaurantId);
    await this._idbProxy.saveReviews(reviews, []);
    return reviews;
  }

  async fetchReviewById(reviewId) {
    console.log('[ReviewService - fetchReviewById(' + reviewId + ')]');
    let review = await this._idbProxy.getReviewById(reviewId);
    if (review) {
      return review;
    }
    review = await this._serverProxy.fetchReviewById(reviewId);
    await this._idbProxy.saveReview(review);
    return review;
  }

  // TODO
  async saveReview(review) {
    console.log('[ReviewService - saveReview]');
    console.log(review);
    await this._serverProxy.saveReview(review);
  }

  // TODO
  async updateReview(review) {
    console.log('[ReviewService - updateReview]');
    console.log(review);
    await this._serverProxy.updateReview(review);
  }


  // TODO
  async deleteReview(reviewId) {
    console.log('[ReviewService - deleteReview(' + reviewId + ')]');
    await this._serverProxy.deleteReview(reviewId);
  }
}
