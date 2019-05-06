import Assert from '../lib/Assert';
import Converter from '../lib/Converter';
import Image from './Image';

export default class ImageDetail {
  _photograph;
  _description;
  _images;

  get photograph(){
    return this._photograph;
  }

  get description(){
    return this._description;
  }

  get images(){
    return this._images;
  }

  constructor(photograph, description, images){
    Assert.isNotNull('photograph', photograph);
    Assert.isNumeric('photograph', photograph);
    Assert.isNotNull('description', description);
    Assert.isNotNull('images', images);
    Assert.isArray('images', images);

    this._photograph = Converter.toInt(photograph);
    this._description = description;
    this._images = images;
  }

  /**
   * Converts object returned from Idb into an image detail.
   *
   * @param obj
   * @returns {*}
   */
  static idbConvert(obj){
    return obj == null
      ? null
      : new ImageDetail(
        obj.photograph,
        obj.description,
        obj.images == null
          ? null
          : obj.images.map(image => Image.idbConvert(image))
      );
  }

  /**
   * Converts object returned from Proxy into an image detail.
   *
   * @param obj
   * @returns {*}
   */
  static proxyConvert(obj) {
    return obj == null
      ? null
      : new ImageDetail(
        obj.photograph,
        obj.description,
        obj.images == null
          ? null
          : obj.images.map(image => Image.proxyConvert(image))
      );
  }
}
