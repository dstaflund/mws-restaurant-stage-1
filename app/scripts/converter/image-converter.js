import Converter from '../lib/converter';
import Image from '../model/image';

export default class ImageConverter {

  fromIdb(obj){
    return obj == null
      ? null
      : new Image(Converter.toInt(obj.density), obj.name, Converter.toInt(obj.width));
  }

  fromServer(obj){
    return obj == null
      ? null
      : new Image(Converter.toInt(obj.density), obj.name, Converter.toInt(obj.width));
  }
}
