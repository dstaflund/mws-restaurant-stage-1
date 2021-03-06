import Assert from '../lib/assert';
import Converter from '../lib/converter';

export default class Review {
  _comments;
  _createdAt;
  _id;
  _name;
  _rating;
  _restaurantId;
  _updatedAt;

  get comments() {
    return this._comments;
  }

  get createdAt() {
    return this._createdAt;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get rating() {
    return this._rating;
  }

  get restaurantId() {
    return this._restaurantId;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  constructor(comments, createdAt, id, name, rating, restaurantId, updatedAt) {
    Assert.isDate('createdAt', createdAt);
    Assert.isDate('updatedAt', updatedAt);
    Assert.isNumeric('id', id);
    Assert.isNumeric('rating', rating);
    Assert.isNumeric('restaurantId', restaurantId);

    this._comments = comments;
    this._createdAt = Converter.toDate(createdAt);
    this._id = Converter.toInt(id);
    this._name = name;
    this._rating = Converter.toInt(rating);
    this._restaurantId = Converter.toInt(restaurantId);
    this._updatedAt = Converter.toDate(updatedAt);
  }

}
