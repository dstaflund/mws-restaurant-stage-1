class ImageService {
    static _instance;

    static get instance() {
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
        return new Promise((resolve, reject) => {
            resolve(`/images/${restaurant.photographs.images[0].name}`);
        });
    }

    srcSetForRestaurant(restaurant) {
        return new Promise((resolve, reject) => {
            resolve(
                restaurant.photographs.images
                    .map(photo => `/images/${photo.name} ${photo.width}w`)
                    .reduce((previous, current) => `${previous}, ${current}`)
            );
        });
    }

    imageDescriptionForRestaurant(restaurant) {
        return new Promise((resolve, reject) => {
            resolve(restaurant.photographs.description);
        });
    }

    addImageDetails(restaurants){
        // TODO
        restaurants.forEach(restaurant => this.addImageDetail(restaurant));
    }

    addImageDetail(restaurant) {
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
