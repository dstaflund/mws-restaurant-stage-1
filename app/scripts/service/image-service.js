class ImageService {
    static _instance;

    async static get instance() {
        console.log('[image-service - instance]');
        if (! ImageService._instance) {
            ImageService._instance = new ImageService();
            await ImageService._instance.initialize();
        }
        return ImageService._instance;
    }

    _idbProxy;

    async initialize(){
        console.log('[image-service - initialize]');
        this._idbProxy = await IdbProxy.instance;
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
        let promises = [];
        restaurants.forEach(restaurant => promises.push(this.addImageDetail(restaurant)));
        await Promise.all(promises);
    }

    async addImageDetail(restaurant) {
        console.log('[image-service - addImageDetail]');
        restaurant.photographs = await this._idbProxy.getImageDetails(restaurant.photograph);
    }
}
