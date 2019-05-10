/**
 * This class assumes that validation has already been done on values
 * passed into the methods.
 */
export default class Converter {

  static toInt(val){
    console.log(`[Converter - toInt] val = ${val}`);
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? val
      : parseInt(val, 10);
  }

  static toFloat(val){
    console.log(`[Converter - toFloat] val = ${val}`);
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? val
      : parseFloat(val);
  }

  static toBoolean(val){
    console.log(`[Converter - toBoolean] val = ${val}`);
    if (typeof val === 'undefined' || val == null) {
      return false;
    }

    if ('boolean' === typeof val){
      return val;
    }

    return 'number' === typeof val
      ? val === 0
      : 'false' === val.toLowerCase().trim();
  }

  static toDate(val){
    console.log(`[Converter - toDate] val = ${val}`);
    if (val == null) {
      return null;
    }
    return 'number' === typeof val
      ? new Date(val)
      : Date.parse(val);
  }
}
