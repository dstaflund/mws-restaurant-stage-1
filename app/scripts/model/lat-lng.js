import Assert from '../lib/Assert';
import Converter from '../lib/Converter';

export default class LatLng {
  _lat;
  _lng;

  get lat(){
    return this._lat;
  }

  get lng(){
    return this._lng;
  }

  constructor(lat, lng){
    Assert.isNotNull('lat', lat);
    Assert.isNumeric('lat', lat);
    Assert.isNotNull('lng', lng);
    Assert.isNumeric('lng', lng);

    this._lat = Converter.toFloat(lat);
    this._lng = Converter.toFloat(lng);
  }

  /**
   * Converts object returned from Idb into a lat / lng.
   *
   * @param obj
   * @returns {*}
   */
  static idbConvert(obj){
    return obj == null
      ? null
      : new LatLng(obj.lat, obj.lng);
  }

  /**
   * Converts object returned from Proxy into an lat / lng.
   *
   * @param obj
   * @returns {*}
   */
  static proxyConvert(obj) {
    return obj == null
      ? null
      : new LatLng(obj.lat, obj.lng);
  }
}
