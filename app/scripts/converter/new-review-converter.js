import Converter from '../lib/converter';
import NewReview from "../model/new-review";


export default class NewReviewConverter {

  fromIdb(obj) {
    return obj == null
      ? null
      : new NewReview(
          Converter.toInt(obj.restaurantId),
          obj.name,
          Converter.toInt(obj.rating),
          obj.comments
        );
  }

  toIdb(obj) {
    return obj == null
      ? null
      : {
          restaurantId: Converter.toInt(obj.restaurantId),
          name: obj.name,
          rating: Converter.toInt(obj.rating),
          comments: obj.comments
        };
  }

  toServer(obj) {
    return obj == null
      ? null
      : {
          comments: obj.comments,
          name: obj.name,
          rating: Converter.toInt(obj.rating),
          restaurant_id: Converter.toInt(obj.restaurantId),
        };
  }
}
