import Converter from '../lib/converter';
import Image from '../model/image';

export default class ImageConverter {

  fromIdb(obj){
    console.log('[ImageConverter - fromIdb]');
    console.log(obj);
    return obj == null
      ? null
      : new Image(Converter.toInt(obj.density), obj.name, Converter.toInt(obj.width));
  }

  fromServer(obj){
    console.log('[ImageConverter - fromServer]');
    console.log(obj);
    return obj == null
      ? null
      : new Image(Converter.toInt(obj.density), obj.name, Converter.toInt(obj.width));
  }
}
