import IdbProxyAgent from '../proxy/idb-proxy-agent';
import ServerProxyAgent from '../proxy/server-proxy-agent';


export default class ReviewService {
  _idbProxyAgent;
  _serverProxyAgent;

  constructor(){
    this._idbProxyAgent = new IdbProxyAgent();
    this._serverProxyAgent = new ServerProxyAgent();
  }

  async fetchReviews() {
    console.log('[ReviewService - fetchReviews]');
    const cachedReviews = await this._idbProxyAgent.getReviews();
    if (cachedReviews && this.allOriginalReviewsInDb()) {
      return cachedReviews;
    }
    const reviews = await this._serverProxyAgent.fetchReviews();
    await this._idbProxyAgent.saveReviews(reviews, cachedReviews);
    return reviews;
  }

  // TODO
  allOriginalReviewsInDb(){
    console.log('[ReviewService - allOriginalReviewsInDb]');
    return false;
  }

  async fetchReviewsByRestaurantId(restaurantId) {
    console.log('[ReviewService - fetchReviewsByRestaurantId(' + restaurantId + ')]');
    console.log('[ReviewService - fetchReviewsByRestaurantId] ' + 1);
    let reviews = await this._idbProxyAgent.getReviewsByRestaurantId(restaurantId);
    console.log(reviews);
    console.log('[ReviewService - fetchReviewsByRestaurantId] ' + 2);
    if (reviews && reviews.length > 0) {
      console.log('[ReviewService - fetchReviewsByRestaurantId] ' + 3);
      return reviews;
    }
    console.log('[ReviewService - fetchReviewsByRestaurantId] ' + 4);
    reviews = await this._serverProxyAgent.fetchReviewsByRestaurantId(restaurantId);
    console.log('[ReviewService - fetchReviewsByRestaurantId] ' + 5);
    await this._idbProxyAgent.saveReviews(reviews, []);
    console.log('[ReviewService - fetchReviewsByRestaurantId] ' + 6);
    return reviews;
  }

  async fetchReviewById(reviewId) {
    console.log('[ReviewService - fetchReviewById(' + reviewId + ')]');
    let review = await this._idbProxyAgent.getReviewById(reviewId);
    if (review) {
      return review;
    }
    review = await this._serverProxyAgent.fetchReviewById(reviewId);
    await this._idbProxyAgent.saveReview(review);
    return review;
  }

  // TODO
  async saveReview(review) {
    console.log('[ReviewService - saveReview]');
    console.log(review);
    await this._serverProxyAgent.saveReview(review);
  }

  // TODO
  async updateReview(review) {
    console.log('[ReviewService - updateReview]');
    console.log(review);
    await this._serverProxyAgent.updateReview(review);
  }


  // TODO
  async deleteReview(reviewId) {
    console.log('[ReviewService - deleteReview(' + reviewId + ')]');
    await this._serverProxyAgent.deleteReview(reviewId);
  }
}
