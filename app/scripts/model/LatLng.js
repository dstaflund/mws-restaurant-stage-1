/**
 * Represents a geographical coordinate.
 *
 * 'lat' and 'lng' together form the object's composite key.
 */
export class LatLng {
  _lat;
  _lng;

  get lat(){
    return this._lat;
  }

  get lng(){
    return this._lng;
  }

  constructor(lat, lng){
    this._lat = typeof lat == "number" ? lat : Number.parseFloat(lat);
    this._lng = typeof lng == "number" ? lng : Number.parseFloat(lng);
  }

  toString(){
    return `LatLng(lat=${this._lat},lng=${this._lng})`;
  }
}
