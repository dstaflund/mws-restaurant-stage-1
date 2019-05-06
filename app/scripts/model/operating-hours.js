import Assert from '../lib/Assert';

export default class OperatingHours {
  _sunday;
  _monday;
  _tuesday;
  _wednesday;
  _thursday;
  _friday;
  _saturday;

  get sunday(){
    return this._sunday;
  }

  get monday(){
    return this._monday;
  }

  get tuesday(){
    return this._tuesday;
  }

  get wednesday(){
    return this._wednesday;
  }

  get thursday(){
    return this._thursday;
  }

  get friday(){
    return this._friday;
  }

  get saturday(){
    return this._saturday;
  }

  constructor(sunday, monday, tuesday, wednesday, thursday, friday, saturday){
    Assert.isNotNull('sunday', sunday);
    Assert.isNotNull('monday', monday);
    Assert.isNotNull('tuesday', tuesday);
    Assert.isNotNull('wednesday', wednesday);
    Assert.isNotNull('thursday', thursday);
    Assert.isNotNull('friday', friday);
    Assert.isNotNull('saturday', saturday);

    this._sunday = sunday;
    this._monday = monday;
    this._tuesday = tuesday;
    this._wednesday = wednesday;
    this._thursday = thursday;
    this._friday = friday;
    this._saturday = saturday;
  }

  /**
   * Converts object returned from Idb into operating hours.
   *
   * @param obj
   * @returns {*}
   */
  static idbConvert(obj){
    return obj == null
      ? null
      : new OperatingHours(obj.sunday, obj.monday, obj.tuesday, obj.wednesday, obj.thursday, obj.friday, obj.saturday);
  }

  /**
   * Converts object returned from Proxy into operating hours.
   *
   * @param obj
   * @returns {*}
   */
  static proxyConvert(obj) {
    return obj == null
      ? null
      : new OperatingHours(obj.sunday, obj.monday, obj.tuesday, obj.wednesday, obj.thursday, obj.friday, obj.saturday);
  }
}
