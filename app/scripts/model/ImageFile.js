/**
 * Contains the name, width, and density of a single image file.
 *
 * 'name' is the object's key
 */
export class ImageFile {
  _name;
  _photograph;
  _width;
  _density;

  get name(){
    return this._name;
  }

  get photograph(){
    return this._photograph;
  }

  get width(){
    return this._width;
  }

  get density(){
    return this._density;
  }

  constructor(name, photograph, width, density) {
    this._name = name;
    this._photograph = photograph;
    this._width = typeof width == 'number' ? width : Number.parseInt(width);
    this._density = typeof density == 'number' ? density : Number.parseFloat(density);
  }

  toString(){
    return `ImageFile(name='${this._name}',photograph=${this._photograph},`
         + `width=${this._width},density=${this._density})`;
  }
}
