/**
 * Represents a restaurant review.
 *
 * 'id' is the key of this object.
 */
export class Review {
  _id;
  _restaurantId;
  _name;
  _date;
  _rating;
  _comments;

  get id(){
    return this._id;
  }

  get restaurantId(){
    return this._restaurantId;
  }

  get name(){
    return this._name;
  }

  get date(){
    return this._date;
  }

  get rating(){
    return this._rating;
  }

  get comments(){
    return this._comments;
  }

  constructor(name, restaurantId, date, rating, comments){
    this._name = name;
    this._restaurantId = restaurantId;
    this._date = date;
    this._rating = typeof rating == "number" ? rating : Number.parseFloat(rating);
    this._commments = comments;
  }

  toString(){
    return `Review(id=${this._id},restaurantId=${this._restaurantId},name='${this._name}',`
         + `date='${this._date}',rating=${this._rating},comments='${this._comments}')`;
  }
}
