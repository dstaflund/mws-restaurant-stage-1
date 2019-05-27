import Converter from "../lib/converter";
import NewReviewConverter from "../converter/new-review-converter";
import SyncReview from "../model/sync-review";

export default class SyncReviewConverter {
  _newReviewConverter;

  constructor(){
    this._newReviewConverter = new NewReviewConverter();
  }

  fromIdb(obj) {
    return obj == null
      ? null
      : new SyncReview(this._newReviewConverter.fromIdb(obj.newReview));
  }

  toIdb(obj) {
    return obj == null
      ? null
      : { hash: Converter.toInt(obj.hash), newReview: this._newReviewConverter.toIdb(obj.newReview) };
  }
}
