/**
 * This class assumes that validation has already been done on values
 * passed into the methods.
 */
export default class Converter {

  static toInt(val) {
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? val
      : parseInt(val, 10);
  }

  static toFloat(val) {
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? val
      : parseFloat(val);
  }

  static toBoolean(val) {
    if (typeof val === 'undefined' || val == null) {
      return false;
    }

    if ('boolean' === typeof val) {
      return val;
    }

    if ('number' === typeof val) {
      return val !== 0;
    }

    return 'true' === val.toLowerCase().trim();
  }

  static toDate(val) {
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? new Date(val)
      : Date.parse(val);
  }
}
