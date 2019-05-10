import OperatingHours from '../model/operating-hours';


export default class OperatingHoursConverter {

  fromIdb(obj){
    console.log('[OperatingHours - fromIdb]');
    console.log(obj);
    return obj == null
      ? null
      : new OperatingHours(obj.Sunday, obj.Monday, obj.Tuesday, obj.Wednesday, obj.Thursday, obj.Friday, obj.Saturday);
  }

  fromServer(obj) {
    console.log('[OperatingHours - fromServer]');
    console.log(obj);
    return obj == null
      ? null
      : new OperatingHours(obj.Sunday, obj.Monday, obj.Tuesday, obj.Wednesday, obj.Thursday, obj.Friday, obj.Saturday);
  }

  toIdb(obj){
    console.log('[OperatingHours - toIdb]');
    console.log(obj);
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
    console.log('[OperatingHours - toServer]');
    console.log(obj);
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
