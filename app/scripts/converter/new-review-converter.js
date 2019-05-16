import Converter from '../lib/converter';


export default class NewReviewConverter {

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
