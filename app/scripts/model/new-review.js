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

  validate() {
    const errors = [];
    if (!this._name || this._name.length < 2 || this._name.length > 20) {
      errors.push('A name between 2 and 20 characters is required');
    }
    if (this._rating == null || this._rating < 0 || this._rating > 5) {
      errors.push('A rating between 0 and 5 is required');
    }
    if (!this._comments || this._comments.length < 10 || this._comments.length > 1000) {
      errors.push('Comments between 10 and 1000 characters is required');
    }
    return errors;
  }
}
