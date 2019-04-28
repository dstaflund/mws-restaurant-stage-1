import IdbProxy from '../proxy/idb-proxy';


export default class ImageService {
    _idbProxy;

    constructor(){
      this._idbProxy = new IdbProxy();
    }

    async imageUrlForRestaurant(restaurant) {
        console.log('[image-service - imageUrlForRestaurant]');
        return `/images/${restaurant.photographs.images[0].name}`;
    }

    async srcSetForRestaurant(restaurant) {
        console.log('[image-service - srcSetForRestaurant]');
        return restaurant.photographs.images
                .map(photo => `/images/${photo.name} ${photo.width}w`)
                .reduce((previous, current) => `${previous}, ${current}`);
    }

    async imageDescriptionForRestaurant(restaurant) {
        console.log('[image-service - ImageDescriptionForRestaurant]');
        return restaurant.photographs.description;
    }

    async addImageDetails(restaurants){
        console.log('[image-service - addImageDetails]');
        for(const restaurant of restaurants) {
          await this.addImageDetail(restaurant);
        }
    }

    async addImageDetail(restaurant) {
        console.log('[image-service - addImageDetail]');
        const imageDetails = await this._idbProxy.getImageDetails(restaurant.photograph);
        restaurant.photographs = imageDetails;
    }
}
