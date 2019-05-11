import Assert from '../lib/assert';
import Converter from '../lib/converter';
import LatLng from './lat-lng';
import OperatingHours from './operating-hours';

export default class Restaurant {
  _address;
  _createdAt;
  _cuisineType;
  _id;
  _isFavorite;
  _photographs;      // Populated at runtime
  _latLng;
  _name;
  _neighborhood;
  _operatingHours;
  _photograph;
  _updatedAt;

  get address(){
    return this._address;
  }

  get createdAt(){
    return this._createdAt;
  }

  get cuisineType(){
    return this._cuisineType;
  }

  get id(){
    return this._id;
  }

  get photographs(){
    return this._photographs;
  }

  set photographs(photographs){
    this._photographs = photographs;
  }

  get isFavorite(){
    return this._isFavorite;
  }

  set isFavorite(isFavorite){
    this._isFavorite = isFavorite;
  }

  get latLng(){
    return this._latLng;
  }

  get name(){
    return this._name;
  }

  get neighborhood(){
    return this._neighborhood;
  }

  get operatingHours(){
    return this._operatingHours;
  }

  get photograph(){
    return this._photograph;
  }

  get updatedAt(){
    return this._updatedAt;
  }

  constructor(address, createdAt, cuisineType, id, isFavorite, latLng, name,
              neighborhood, operatingHours, photograph, updatedAt){
    Assert.isNumeric('id', id);
    Assert.isBoolean('isFavorite', isFavorite, true);
    Assert.isNumeric('photograph', photograph, true);
    Assert.isObject('latLng', latLng);
    Assert.isObject('operatingHours', operatingHours);
    Assert.isDate('createdAt', createdAt);
    Assert.isDate('updatedAt', updatedAt);

    this._address = address;
    this._createdAt = Converter.toDate(createdAt);
    this._cuisineType = cuisineType;
    this._id = Converter.toInt(id);
    this._isFavorite = Converter.toBoolean(isFavorite);
    this._latLng = latLng;
    this._name = name;
    this._neighborhood = neighborhood;
    this._operatingHours = operatingHours;
    this._photograph = photograph == null ? 10 : Converter.toInt(photograph);
    this._updatedAt = Converter.toDate(updatedAt);
  }

}
