import OperatingHours from '../model/operating-hours';


export default class OperatingHoursConverter {

  fromIdb(obj) {
    return obj == null
      ? null
      : new OperatingHours(obj.Sunday, obj.Monday, obj.Tuesday, obj.Wednesday, obj.Thursday, obj.Friday, obj.Saturday);
  }

  fromServer(obj) {
    return obj == null
      ? null
      : new OperatingHours(obj.Sunday, obj.Monday, obj.Tuesday, obj.Wednesday, obj.Thursday, obj.Friday, obj.Saturday);
  }

  toIdb(obj) {
    return obj == null
      ? null
      : {
        Sunday: obj.sunday,
        Monday: obj.monday,
        Tuesday: obj.tuesday,
        Wednesday: obj.wednesday,
        Thursday: obj.thursday,
        Friday: obj.friday,
        Saturday: obj.saturday
      };
  }
}
