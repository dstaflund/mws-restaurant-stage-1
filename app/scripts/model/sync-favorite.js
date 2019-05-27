import Assert from "../lib/assert";

export default class SyncFavorite {
  _restaurantId;
  _favoriteInd;

  get restaurantId(){
    return this._restaurantId;
  }

  get favoriteInd(){
    return this._favoriteInd;
  }

  set favoriteInd(favoriteInd){
    this._favoriteInd = favoriteInd;
  }

  constructor(restaurantId, favoriteInd){
    Assert.isNotNull('restaurantId', restaurantId);
    Assert.isNumeric('restaurantId', restaurantId);
    Assert.isNotNull('favoriteInd', favoriteInd);
    Assert.isBoolean('favoriteInd', favoriteInd);

    this._restaurantId = restaurantId;
    this._favoriteInd = favoriteInd;
  }
}
