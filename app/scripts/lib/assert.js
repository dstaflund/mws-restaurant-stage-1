export default class Assert {

  static isNotNull(name, val, nullable = false){
    console.log(`[Assert - isNotNull] (name, val) = (${name}, ${val})`);
    if (val == null && nullable) {
      return;
    }
    if (val == null) {
      throw new Error(`${name} is null`);
    }
  }

  static isNumeric(name, val, nullable = false){
    console.log(`[Assert - isNumeric] (name, val) = (${name}, ${val})`);
    if (val == null && nullable) {
      return;
    }
    if (isNaN(val)) {
      throw new Error(`${name} is not numeric`);
    }
  }

  static isArray(name, val, nullable = false){
    console.log(`[Assert - isArray] (name, val) = (${name}, ...)`);
    console.log(val);
    if (val == null && nullable) {
      return;
    }
    if (! Array.isArray(val)){
      throw new Error(`${name} is not an array`);
    }
  }

  static isBoolean(name, val, nullable = false){
    console.log(`[Assert - isBoolean] (name, val) = (${name}, ${val})`);
    if (val == null && nullable) {
      return;
    }
    if (val == null && nullable) {
      return;
    }
    if ('boolean' !== typeof val) {
      throw new Error(`${name} is not boolean`);
    }
  }

  static isDate(name, val, nullable = false){
    console.log(`[Assert - isDate] (name, val) = (${name}, ${val})`);
    if (val == null && nullable) {
      return;
    }
    if (Object.prototype.toString.call(val) === "[object Date]") {
      return true;
    }
    try {
      if (! isNaN(val) && Object.prototype.toString.call(new Date(val)) === "[object Date]") {
        return true;
      }
      if (Object.prototype.toString.call(new Date(val)) === "[object Date]") {
        return true;
      }
    }
    catch(error){
      throw new Error(`${name} is not a date`);
    }

    throw new Error(`${name} is not a date`);
  }

  static isObject(name, val, nullable = false){
    console.log(`[Assert - isObject] (name, val) = (${name}, ${val})`);
    if (val == null && nullable) {
      return;
    }
    if ('object' !== typeof val){
      throw new Error(`${name} is not an object`);
    }
  }
}
