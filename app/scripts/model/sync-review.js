import Assert from "../lib/assert";
import Hash from "../lib/hash";

export default class SyncReview {
  _hash;
  _newReview;

  get hash(){
    return this._hash;
  }

  get newReview(){
    return this._newReview;
  }

  constructor(newReview){
    Assert.isNotNull('newReview', newReview);

    this._newReview = newReview;
    this._hash = Hash.hash(newReview.restaurantId + newReview.name + newReview.rating + newReview.comments);
  }
}
