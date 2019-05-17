import Assert from '../lib/assert';
import Converter from '../lib/converter';

export default class LatLng {
  _lat;
  _lng;

  get lat() {
    return this._lat;
  }

  get lng() {
    return this._lng;
  }

  constructor(lat, lng) {
    Assert.isNotNull('lat', lat);
    Assert.isNumeric('lat', lat);
    Assert.isNotNull('lng', lng);
    Assert.isNumeric('lng', lng);

    this._lat = Converter.toFloat(lat);
    this._lng = Converter.toFloat(lng);
  }

}
