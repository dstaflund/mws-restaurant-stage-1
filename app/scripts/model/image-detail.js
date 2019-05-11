import Assert from '../lib/assert';
import Converter from '../lib/converter';
import Image from './image';

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

}
