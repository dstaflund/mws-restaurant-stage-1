import IdbProxyAgent from '../proxy/idb-proxy-agent';


export default class ImageService {
    _idbProxyAgent;

    constructor(){
      this._idbProxyAgent = new IdbProxyAgent();
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
      if (! ('photograph' in restaurant)) {
        restaurant.photograph = 10;
      }
      restaurant.photographs = await this._idbProxyAgent.getImageDetails(restaurant.photograph);
    }
}
