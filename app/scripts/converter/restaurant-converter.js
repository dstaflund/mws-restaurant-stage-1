import Converter from '../lib/converter';
import LatLngConverter from './lat-lng-converter';
import OperatingHoursConverter from './operating-hours-converter';
import Restaurant from '../model/restaurant';


export default class RestaurantConverter {
  _latLngConverter;
  _operatingHoursConverter;

  constructor(){
    this._latLngConverter = new LatLngConverter();
    this._operatingHoursConverter = new OperatingHoursConverter();
  }

  fromIdb(obj){
    console.log('[RestaurantConverter - fromIdb]');
    console.log(obj);
    return obj == null
      ? null
      : new Restaurant(
        obj.address,
        obj.createdAt,
        obj.cuisineType,
        Converter.toInt(obj.id),
        obj.is_favorite,
        this._latLngConverter.fromIdb(obj.latLng),
        obj.name,
        obj.neighborhood,
        this._operatingHoursConverter.fromIdb(obj.operating_hours),
        obj.photograph,
        obj.updatedAt
      );
  }

  fromServer(obj) {
    console.log('[RestaurantConverter - fromServer]');
    console.log(obj);
    return obj == null
      ? null
      : new Restaurant(
        obj.address,
        obj.createdAt,
        obj.cuisine_type,
        Converter.toInt(obj.id),
        obj.is_favorite,
        this._latLngConverter.fromServer(obj.latlng),
        obj.name,
        obj.neighborhood,
        this._operatingHoursConverter.fromServer(obj.operating_hours),
        obj.photograph,
        obj.updatedAt
      );
  }

  toIdb(obj) {
    console.log('[RestaurantConverter - toIdb]');
    console.log(obj);
    return obj == null
      ? null
      : {
          address: obj.address,
          createdAt: obj.createdAt,
          cuisineType: obj.cuisineType,
          id: Converter.toInt(obj.id),
          isFavorite: obj.isFavorite,
          latLng: this._latLngConverter.toIdb(obj.latLng),
          name: obj.name,
          neighborhood: obj.neighborhood,
          operatingHours: this._operatingHoursConverter.toIdb(obj.operating_hours),
          photograph: Converter.toInt(obj.photograph),
          updatedAt: obj.updatedAt
        };
  }
}
