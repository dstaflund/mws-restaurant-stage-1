import IdbProxy from '../proxy/idb-proxy';


export default class ImageService {
    _idbProxy;

    constructor(){
      this._idbProxy = new IdbProxy();
    }

    async imageUrlForRestaurant(restaurant) {
        return `/images/${restaurant.photographs.images[0].name}`;
    }

    async srcSetForRestaurant(restaurant) {
        return restaurant.photographs.images
                .map(photo => `/images/${photo.name} ${photo.width}w`)
                .reduce((previous, current) => `${previous}, ${current}`);
    }

    async imageDescriptionForRestaurant(restaurant) {
        return restaurant.photographs.description;
    }

    async addImageDetails(restaurants){
        for(const restaurant of restaurants) {
          await this.addImageDetail(restaurant);
        }
    }

    async addImageDetail(restaurant) {
        const imageDetails = await this._idbProxy.getImageDetails(restaurant.photograph);
        restaurant.photographs = imageDetails;
    }
}
