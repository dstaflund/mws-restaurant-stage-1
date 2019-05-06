export default class Assert {

  static isNotNull(name, val){
    if (val == null) {
      throw new Error(`${name} is null`);
    }
  }

  static isNumeric(name, val){
    if (isNaN(val)) {
      throw new Error(`${name} is not numeric`);
    }
  }

  static isArray(name, val){
    if (Array.isArray(val)){
      throw new Error(`${name} is not an array`);
    }
  }

  static isBoolean(name, val){
    if ('boolean' !== typeof val) {
      throw new Error(`${name} is not boolean`);
    }
  }

  static isDate(name, val){
    if (Object.prototype.toString.call(val) === "[object Date]") {
      return true;
    }
    try {
      if (! isNaN(val) && Object.prototype.toString.call(new Date(val)) === "[object Date]") {
        return true;
      }
      if (Object.prototype.toString.call(Date.parse(val)) === "[object Date]") {
        return true;
      }
    }
    catch(error){
      throw new Error(`${name} is not a date`);
    }

    throw new Error(`${name} is not a date`);
  }

  static isObject(name, val){
    if ('object' !== typeof val){
      throw new Error(`${name} is not an object`);
    }
  }
}
