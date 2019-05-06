import Assert from '../lib/Assert';
import Converter from '../lib/Converter';
import ImageDetail from './ImageDetails';
import LatLng from './LatLng';
import OperatingHours from './OperatingHours';

export default class Restaurant {
  _address;
  _createdAt;
  _cuisineType;
  _id;
  _isFavorite;
  _imageDetails;      // Populated at runtime
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

  get imageDetails(){
    return this._imageDetails;
  }

  set imageDetails(imageDetails){
    this._imageDetails = imageDetails;
  }

  get isFavorite(){
    return this._isFavorite;
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
    Assert.isBoolean('isFavorite', isFavorite);
    Assert.isNumeric('photograph', photograph);
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
    this._photograph = Converter.toInt(photograph);
    this._updatedAt = Converter.toDate(updatedAt);
  }

  /**
   * Converts object returned from Idb into a restaurant.
   *
   * @param obj
   * @returns {*}
   */
  static idbConvert(obj){
    return obj == null
      ? null
      : new Restaurant(
        obj.address,
        obj.createdAt,
        obj.cuisine_type,
        obj.id,
        obj.is_favorite,
        LatLng.idbConvert(obj.latLng),
        obj.name,
        obj.neighborhood,
        OperatingHours.idbConvert(obj.operating_hours),
        obj.photograph,
        obj.updatedAt
      );
  }

  /**
   * Converts object returned from Proxy into a restaurant.
   *
   * @param obj
   * @returns {*}
   */
  static proxyConvert(obj) {
    return obj == null
      ? null
      : new Restaurant(
        obj.address,
        obj.createdAt,
        obj.cuisine_type,
        obj.id,
        obj.is_favorite,
        LatLng.proxyConvert(obj.latLng),
        obj.name,
        obj.neighborhood,
        OperatingHours.proxyConvert(obj.operating_hours),
        obj.photograph,
        obj.updatedAt
      );
  }
}
