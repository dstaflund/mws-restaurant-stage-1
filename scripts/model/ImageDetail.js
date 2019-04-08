/**
 * Contains information on all image files associated with a particular restaurant image, as well as its description.
 *
 * '_photograph' is the object's key.  Corresponds to 'photograph' property in server's "localDiskDb.db" file.
 */
export class ImageDetail {
  _photograph;
  _description;

  get photograph(){
    return this._photograph;
  }

  get description(){
    return this._description;
  }

  constructor(photograph, description){
    this._photograph = typeof photograph == 'number' ? photograph : Number.parseInt(photograph);
    this._description = description;
  }

  toString(){
    return `ImageDetail(photograph=${this._photograph},description='${this._description}')`;
  }
}
