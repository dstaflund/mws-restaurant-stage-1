import Converter from "../lib/converter";
import SyncFavorite from "../model/sync-favorite";

export default class SyncFavoriteConverter {

  fromIdb(obj) {
    return obj == null
      ? null
      : new SyncFavorite(Converter.toInt(obj.restaurantId), Converter.toBoolean(obj.favoriteInd));
  }

  toIdb(obj) {
    return obj == null
      ? null
      : { restaurantId: Converter.toInt(obj.restaurantId), favoriteInd: Converter.toBoolean(obj.favoriteInd) };
  }
}
