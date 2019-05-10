import Converter from '../lib/converter';
import Review from '../model/review';


export default class ReviewConverter {

  fromIdb(obj){
    console.log('[ReviewConverter - fromIdb]');
    console.log(obj);
    return obj == null
      ? null
      : new Review(
        obj.comments,
        obj.createdAt,
        Converter.toInt(obj.id),
        obj.name,
        Converter.toInt(obj.rating),
        Converter.toInt(obj.restaurantId),
        obj.updatedAt
      );
  }

  fromServer(obj) {
    console.log('[ReviewConverter - fromServer]');
    console.log(obj);
    return obj == null
      ? null
      : new Review(
        obj.comments,
        obj.createdAt,
        Converter.toInt(obj.id),
        obj.name,
        Converter.toInt(obj.rating),
        Converter.toInt(obj.restaurantId),
        obj.updatedAt
      );
  }

  toIdb(obj){
    console.log('[ReviewConverter - toIdb]');
    console.log(obj);
    return obj == null
      ? null
      : {
          comments: obj.comments,
          id: Converter.toInt(obj.id),
          name: obj.name,
          rating: Converter.toInt(obj.rating),
          restaurantId: Converter.toInt(obj.restaurantId),
          createdAt: obj.createdAt,
          updatedAt: obj.updatedAt
        };
  }

  toServer(obj) {
    console.log('[ReviewConverter - toServer]');
    console.log(obj);
    return obj == null
      ? null
      : {
          comments: obj.comments,
          id: Converter.toInt(obj.id),
          name: obj.name,
          rating: Converter.toInt(obj.rating),
          restaurant_id: Converter.toInt(obj.restaurantId),
          createdAt: obj.createdAt,
          updatedAt: obj.updatedAt
        };
  }
}
