import Assert from '../lib/Assert';
import Converter from '../lib/Converter';

export default class Image {
  _density;
  _name;
  _width;

  get density(){
    return this._density;
  }

  get name(){
    return this._name;
  }

  get width(){
    return this._width;
  }

  constructor(density, name, width){
    Assert.isNotNull('density', density);
    Assert.isNumeric('density', density);
    Assert.isNotNull('name', name);
    Assert.isNotNull('width', width);
    Assert.isNumeric('width', width);

    this._density = Converter.toFloat(density);
    this._name = name;
    this._width = Converter.toInt(width);
  }

  /**
   * Converts object returned from Idb into an image.
   *
   * @param obj
   * @returns {*}
   */
  static idbConvert(obj){
    return obj == null
      ? null
      : new Image(obj.density, obj.name, obj.width);
  }

  /**
   * Converts object returned from Proxy into an image.
   *
   * @param obj
   * @returns {*}
   */
  static proxyConvert(obj) {
    return obj == null
      ? null
      : new Image(obj.density, obj.name, obj.width);
  }
}
