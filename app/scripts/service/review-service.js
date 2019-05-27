import IdbProxyAgent from '../proxy/idb-proxy-agent';
import ServerProxyAgent from '../proxy/server-proxy-agent';
import NetworkMonitor from "../service/network-monitor";
import SyncReview from "../model/sync-review";


export default class ReviewService {
  static _instance;

  static getInstance(){
    if (ReviewService._instance == null){
      ReviewService._instance = new ReviewService();
    }
    return ReviewService._instance;
  }

  _idbProxyAgent;
  _serverProxyAgent;
  _networkMonitor;

  constructor() {
    this._idbProxyAgent = new IdbProxyAgent();
    this._serverProxyAgent = new ServerProxyAgent();
    this._networkMonitor = NetworkMonitor.getInstance();
  }

  async fetchReviews() {
    const cachedReviews = await this._idbProxyAgent.getReviews();
    if (cachedReviews && cachedReviews.length >= 30) {
      await this.appendSyncReviews(cachedReviews);
      return cachedReviews;
    }
    const reviews = await this._serverProxyAgent.fetchReviews();
    await this._idbProxyAgent.saveReviews(reviews, cachedReviews);
    await this.appendSyncReviews(reviews);
    return reviews;
  }

  async appendSyncReviews(reviews){
    const syncReviews = await this._idbProxyAgent.getSyncReviewsAsReviews();
    if (syncReviews && syncReviews.length > 0) {
      syncReviews.forEach(syncReview => reviews.push(syncReview));
    }
  }

  async fetchReviewsByRestaurantId(restaurantId) {
    const cachedReviews = await this._idbProxyAgent.getReviewsByRestaurantId(restaurantId);
    if (cachedReviews && cachedReviews.length > 0) {
      await this.appendSyncReviews(cachedReviews);
      return cachedReviews;
    }
    const reviews = await this._serverProxyAgent.fetchReviewsByRestaurantId(restaurantId);
    await this._idbProxyAgent.saveReviews(reviews, cachedReviews);
    await this.appendSyncReviews(reviews);
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
    if (! this._networkMonitor.isOnline()) {
      const syncReview = new SyncReview(review);
      return await this._idbProxyAgent.saveSyncReview(syncReview);
    } else {
      const createdReview = await this._serverProxyAgent.saveReview(review);
      return await this._idbProxyAgent.saveReview(createdReview);
    }
  }

  async syncReviews(){
    const syncReviews = await this._idbProxyAgent.getSyncReviews();
    if (syncReviews == null) {
      return;
    }
    syncReviews.forEach(async syncReview => {
      if (this._networkMonitor.isOnline()) {
        const createdReview = await this._serverProxyAgent.saveReview(syncReview.newReview);
        await this._idbProxyAgent.saveReview(createdReview);
        await this._idbProxyAgent.deleteSyncReview(syncReview);
      }
    });
  }
}
