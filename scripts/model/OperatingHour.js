/**
 * Contains the business hours of a given workday.
 *
 * This is a value object, not a business object, and as such doesn't have a key.
 */
export class OperatingHour {
  _dayOfWeek;
  _hours;

  get dayOfWeek(){
    return this._dayOfWeek;
  }

  get hours(){
    return this._hours;
  }

  constructor(dayOfWeek, hours){
    this._dayOfWeek = day;
    this._hours = hours;
  }

  toString(){
    return `OperatingHour(dayOfWeek='${this._dayOfWeek}',hours='${this._hours}')`;
  }
}
