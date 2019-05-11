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
    return false;
  }

  async fetchReviewsByRestaurantId(restaurantId) {
    let reviews = await this._idbProxyAgent.getReviewsByRestaurantId(restaurantId);
    if (reviews && reviews.length > 0) {
      return reviews;
    }
    reviews = await this._serverProxyAgent.fetchReviewsByRestaurantId(restaurantId);
    await this._idbProxyAgent.saveReviews(reviews, []);
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

  // TODO
  async saveReview(review) {
    await this._serverProxyAgent.saveReview(review);
  }

  // TODO
  async updateReview(review) {
    await this._serverProxyAgent.updateReview(review);
  }


  // TODO
  async deleteReview(reviewId) {
    await this._serverProxyAgent.deleteReview(reviewId);
  }
}
