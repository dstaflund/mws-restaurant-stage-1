import Converter from '../lib/converter';
import LatLngConverter from './lat-lng-converter';
import OperatingHoursConverter from './operating-hours-converter';
import Restaurant from '../model/restaurant';


export default class RestaurantConverter {
  _latLngConverter;
  _operatingHoursConverter;

  constructor() {
    this._latLngConverter = new LatLngConverter();
    this._operatingHoursConverter = new OperatingHoursConverter();
  }

  fromIdb(obj) {
    return obj == null
      ? null
      : new Restaurant(
        obj.address,
        obj.createdAt,
        obj.cuisineType,
        Converter.toInt(obj.id),
        Converter.toBoolean(obj.isFavorite),
        this._latLngConverter.fromIdb(obj.latLng),
        obj.name,
        obj.neighborhood,
        this._operatingHoursConverter.fromIdb(obj.operatingHours),
        obj.photograph,
        obj.updatedAt
      );
  }

  fromServer(obj) {
    return obj == null
      ? null
      : new Restaurant(
        obj.address,
        obj.createdAt,
        obj.cuisine_type,
        Converter.toInt(obj.id),
        Converter.toBoolean(obj.is_favorite),
        this._latLngConverter.fromServer(obj.latlng),
        obj.name,
        obj.neighborhood,
        this._operatingHoursConverter.fromServer(obj.operating_hours),
        obj.photograph,
        obj.updatedAt
      );
  }

  toIdb(obj) {
    return obj == null
      ? null
      : {
        address: obj.address,
        createdAt: obj.createdAt,
        cuisineType: obj.cuisineType,
        id: Converter.toInt(obj.id),
        isFavorite: Converter.toBoolean(obj.isFavorite),
        latLng: this._latLngConverter.toIdb(obj.latLng),
        name: obj.name,
        neighborhood: obj.neighborhood,
        operatingHours: this._operatingHoursConverter.toIdb(obj.operatingHours),
        photograph: Converter.toInt(obj.photograph),
        updatedAt: obj.updatedAt
      };
  }
}
