import Converter from '../lib/converter';
import LatLng from '../model/lat-lng';


export default class LatLngConverter {

  fromIdb(obj){
    console.log('[LatLngConverter - fromIdb]');
    console.log(obj);
    return obj == null
      ? null
      : new LatLng(Converter.toFloat(obj.lat), Converter.toFloat(obj.lng));
  }

  fromServer(obj) {
    console.log('[LatLngConverter - fromServer]');
    console.log(obj);
    return obj == null
      ? null
      : new LatLng(Converter.toFloat(obj.lat), Converter.toFloat(obj.lng));
  }

  toIdb(obj){
    console.log('[LatLngConverter - toIdb]');
    console.log(obj);
    return obj == null
      ? null
      : {
        lat: Converter.toFloat(obj.lat),
        lng: Converter.toFloat(obj.lng)
      };
  }

  toServer(obj) {
    console.log('[LatLngConverter - toServer]');
    console.log(obj);
    return obj == null
      ? null
      : {
          lat: Converter.toFloat(obj.lat),
          lng: Converter.toFloat(obj.lng)
      };
  }
}
