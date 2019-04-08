/**
 * Contains information on a given restaurant.
 *
 * 'id' is the object's primary key, while 'name' is the object's business key.
 */
export class Restaurant {
  _id;
  _name;
  _neighbourhood;
  _photograph;
  _address;
  _latLng;
  _cuisineType;
  _operatingHours;
  _createdAt;
  _updatedAt;

  get id(){
    return this._id;
  }

  get name(){
    return this._name;
  }

  get neighborhood(){
    return this._neighbourhood;
  }

  get photograph(){
    return this._photograph;
  }

  get address(){
    return this._address;
  }

  get latLng(){
    return this._latLng;
  }

  get cuisineType(){
    return this._cuisineType;
  }

  get operatingHours(){
    return this._operatingHours;
  }

  get createdAt(){
    return this._createdAt;
  }

  get updatedAt(){
    return this._updatedAt;
  }

  constructor(id, name, neighbourhood, photograph, address, latLng, cuisineType, operatingHours, createdAt, updatedAt){
    this._id = id;
    this._name = name;
    this._neighbourhood = neighbourhood;
    this._photograph = photograph;
    this._address = address;
    this._latLng = latLng;
    this._cuisineType = cuisineType;
    this._operatingHours = operatingHours;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  toString(){
    return `Restaurant(id=${this._id},name='${this._name}',neighbourhood='${this._neighbourhood}',`
         + `photograph=${this._photograph},address='${this._address}',latLng=${this._latLng},`
         + `cuisineType='${this._cuisineType}',operatingHours=${this._operatingHours},`
         + `createdAt=${this._createdAt},updatedAt=${this._updatedAt}`;
  }
}
