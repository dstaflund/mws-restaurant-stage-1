export default class NewReview {
  _restaurantId;
  _name;
  _rating;
  _comments;

  get restaurantId() {
    return this._restaurantId;
  }

  set restaurantId(restaurantId) {
    this._restaurantId = restaurantId;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get rating() {
    return this._rating;
  }

  set rating(rating) {
    this._rating = rating;
  }

  get comments() {
    return this._comments;
  }

  set comments(comments) {
    this._comments = comments;
  }

  constructor(restaurantId, name, rating, comments) {
    this._restaurantId = restaurantId;
    this._name = name;
    this._rating = rating;
    this._comments = comments;
  }

  isNameValid(){
    return this._name != null && this._name.length >= 2 && this._name.length <= 20;
  }

  isRatingValid(){
    return this._rating != null && this._rating >= 0 && this._rating <= 5;
  }

  isCommentsValid(){
    return this._comments != null && this._comments.length >= 10 && this._comments.length <= 1000;
  }

  isValid() {
    return this.isNameValid() && this.isRatingValid() && this.isCommentsValid();
  }
}
