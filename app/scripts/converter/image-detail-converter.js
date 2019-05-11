import Converter from '../lib/converter';
import ImageConverter from './image-converter';
import ImageDetail from "../model/image-detail";


export default class ImageDetailConverter {
  _imageConverter;

  constructor(){
    this._imageConverter = new ImageConverter();
  }

  fromIdb(obj){
    return obj == null
      ? null
      : new ImageDetail(
        Converter.toInt(obj.photograph),
        obj.description,
        obj.images == null
          ? null
          : obj.images.map(image => this._imageConverter.fromIdb(image))
      );
  }

  fromServer(obj) {
    return obj == null
      ? null
      : new ImageDetail(
        Converter.toInt(obj.photograph),
        obj.description,
        obj.images == null
          ? null
          : obj.images.map(image => this._imageConverter.fromServer(image))
      );
  }
}
