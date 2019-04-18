class ImageService {
    static _instance;

    static get instance() {
        console.log('[image-service - instance]');
        return new Promise((resolve, reject) => {
            if (! ImageService._instance) {
                ImageService._instance = new ImageService();
                ImageService._instance.initialize()
                    .then(() => resolve(ImageService._instance))
                    .catch(error => reject(error));
            }
            resolve(ImageService._instance);
        });
    }

    _idbProxy;

    initialize(){
        console.log('[image-service - initialize]');
        return new Promise((resolve, reject) => {
            IdbProxy.instance
                .then(provider => {
                    this._idbProxy = provider;
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    imageUrlForRestaurant(restaurant) {
        console.log('[image-service - imageUrlForRestaurant]');
        return new Promise((resolve, reject) => {
            resolve(`/images/${restaurant.photographs.images[0].name}`);
        });
    }

    srcSetForRestaurant(restaurant) {
        console.log('[image-service - srcSetForRestaurant]');
        return new Promise((resolve, reject) => {
            resolve(
                restaurant.photographs.images
                    .map(photo => `/images/${photo.name} ${photo.width}w`)
                    .reduce((previous, current) => `${previous}, ${current}`)
            );
        });
    }

    imageDescriptionForRestaurant(restaurant) {
        console.log('[image-service - ImageDescriptionForRestaurant]');
        return new Promise((resolve, reject) => {
            resolve(restaurant.photographs.description);
        });
    }

    addImageDetails(restaurants){
        console.log('[image-service - addImageDetails]');
        return new Promise((resolve, reject) => {
            let promises = [];
            restaurants.forEach(restaurant => promises.push(this.addImageDetail(restaurant)));
            Promise.all(promises).then(() => resolve());
        });
    }

    addImageDetail(restaurant) {
        console.log('[image-service - addImageDetail]');
        return new Promise((resolve, reject) => {
            this._idbProxy.getImageDetails(restaurant.photograph)
                .then(details => {
                    restaurant.photographs = details;
                    resolve();
                })
                .catch(error => reject(error));
        });
    }
}
