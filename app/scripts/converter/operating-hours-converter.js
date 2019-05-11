import OperatingHours from '../model/operating-hours';


export default class OperatingHoursConverter {

  fromIdb(obj){
    return obj == null
      ? null
      : new OperatingHours(obj.Sunday, obj.Monday, obj.Tuesday, obj.Wednesday, obj.Thursday, obj.Friday, obj.Saturday);
  }

  fromServer(obj) {
    return obj == null
      ? null
      : new OperatingHours(obj.Sunday, obj.Monday, obj.Tuesday, obj.Wednesday, obj.Thursday, obj.Friday, obj.Saturday);
  }

  toIdb(obj){
    return obj == null
      ? null
      : {
          Sunday: obj.Sunday,
          Monday: obj.Monday,
          Tuesday: obj.Tuesday,
          Wednesday: obj.Wednesday,
          Thursday: obj.Thursday,
          Friday: obj.Friday,
          Saturday: obj.Saturday
        };
  }

  toServer(obj) {
    return obj == null
      ? null
      : {
        Sunday: obj.Sunday,
        Monday: obj.Monday,
        Tuesday: obj.Tuesday,
        Wednesday: obj.Wednesday,
        Thursday: obj.Thursday,
        Friday: obj.Friday,
        Saturday: obj.Saturday
      };
  }
}
