import Converter from '../lib/converter';
import LatLng from '../model/lat-lng';


export default class LatLngConverter {

  fromIdb(obj){
    return obj == null
      ? null
      : new LatLng(Converter.toFloat(obj.lat), Converter.toFloat(obj.lng));
  }

  fromServer(obj) {
    return obj == null
      ? null
      : new LatLng(Converter.toFloat(obj.lat), Converter.toFloat(obj.lng));
  }

  toIdb(obj){
    return obj == null
      ? null
      : {
        lat: Converter.toFloat(obj.lat),
        lng: Converter.toFloat(obj.lng)
      };
  }

  toServer(obj) {
    return obj == null
      ? null
      : {
          lat: Converter.toFloat(obj.lat),
          lng: Converter.toFloat(obj.lng)
      };
  }
}
