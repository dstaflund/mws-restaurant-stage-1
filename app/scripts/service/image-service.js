import IdbProxy from '../proxy/idb-proxy';


export default class ImageService {
    _idbProxy;

    constructor(){
      this._idbProxy = new IdbProxy();
    }

    async imageUrlForRestaurant(restaurant) {
      console.log('ImageService - imageUrlForRestaurant]');
      console.log(restaurant);
        return `/images/${restaurant.photographs.images[0].name}`;
    }

    async srcSetForRestaurant(restaurant) {
      console.log('ImageService - srcSetForRestaurant]');
      console.log(restaurant);
        return restaurant.photographs.images
                .map(photo => `/images/${photo.name} ${photo.width}w`)
                .reduce((previous, current) => `${previous}, ${current}`);
    }

    async imageDescriptionForRestaurant(restaurant) {
      console.log('ImageService - imageDescriptionForRestaurant]');
      console.log(restaurant);
        return restaurant.photographs.description;
    }

    async addImageDetails(restaurants){
      console.log('ImageService - addImageDetails]');
      console.log(restaurants);
        for(const restaurant of restaurants) {
          await this.addImageDetail(restaurant);
        }
    }

    async addImageDetail(restaurant) {
      console.log('ImageService - addImageDetail]');
      console.log(restaurant);
      if (! ('photograph' in restaurant)) {
        restaurant.photograph = 10;
      }
      restaurant.photographs = await this._idbProxy.getImageDetails(restaurant.photograph);
    }
}
