/**
 * This class assumes that validation has already been done on values
 * passed into the methods.
 */
export default class Converter {

  static toInt(val){
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? val
      : parseInt(val, 10);
  }

  static toFloat(val){
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? val
      : parseFloat(val);
  }

  static toBoolean(val){
    if (val == null) {
      return false;
    }
    return 'number' === typeof val
      ? val === 0
      : 'false' === val.toLowerCase().trim();
  }

  static toDate(val){
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? new Date(val)
      : Date.parse(val);
  }
}
