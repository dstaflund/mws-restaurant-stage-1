import Converter from '../lib/converter';
import Review from '../model/review';


export default class ReviewConverter {

  fromIdb(obj) {
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
    return obj == null
      ? null
      : new Review(
        obj.comments,
        Converter.toDate(obj.createdAt),
        Converter.toInt(obj.id),
        obj.name,
        Converter.toInt(obj.rating),
        Converter.toInt(obj.restaurant_id),
        Converter.toDate(obj.updatedAt)
      );
  }

  toIdb(obj) {
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
}
