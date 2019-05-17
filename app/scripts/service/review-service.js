import IdbProxyAgent from '../proxy/idb-proxy-agent';
import ServerProxyAgent from '../proxy/server-proxy-agent';
import NetworkMonitor from "../lib/network-monitor";


export default class ReviewService {
  _idbProxyAgent;
  _serverProxyAgent;
  _networkMonitor;

  constructor() {
    this._idbProxyAgent = new IdbProxyAgent();
    this._serverProxyAgent = new ServerProxyAgent();
    this._networkMonitor = new NetworkMonitor();
  }

  async fetchReviews() {
    const cachedReviews = await this._idbProxyAgent.getReviews();
    if (cachedReviews && this.allOriginalReviewsInDb()) {
      return cachedReviews;
    }
    const reviews = await this._serverProxyAgent.fetchReviews();
    await this._idbProxyAgent.saveReviews(reviews, cachedReviews);
    return reviews;
  }

  // TODO
  allOriginalReviewsInDb() {
    return false;
  }

  async fetchReviewsByRestaurantId(restaurantId) {
    const cachedReviews = await this._idbProxyAgent.getReviewsByRestaurantId(restaurantId);
    if (cachedReviews && cachedReviews.length > 0) {
      return cachedReviews;
    }
    const reviews = await this._serverProxyAgent.fetchReviewsByRestaurantId(restaurantId);
    await this._idbProxyAgent.saveReviews(reviews, cachedReviews);
    return reviews;
  }

  async fetchReviewById(reviewId) {
    let review = await this._idbProxyAgent.getReviewById(reviewId);
    if (review) {
      return review;
    }
    review = await this._serverProxyAgent.fetchReviewById(reviewId);
    await this._idbProxyAgent.saveReview(review);
    return review;
  }

  async saveReview(review) {
    console.log('[review-server - saveReview]');
    console.log('[review-server - saveReview]  review = ');
    console.log(review);
    const createdReview = await this._serverProxyAgent.saveReview(review);
    console.log('[review-server - saveReview]  createdReview = ');
    console.log(createdReview);
    const response = await this._idbProxyAgent.saveReview(createdReview);
    console.log('[review-server - saveReview]  response = ');
    console.log(response);
    return response;
  }

  async updateReview(review) {
    await this._serverProxyAgent.updateReview(review);
  }


  async deleteReview(reviewId) {
    await this._serverProxyAgent.deleteReview(reviewId);
  }
}
