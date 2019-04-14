class ImageService {
    static _instance;

    static get instance() {
        if (! ImageService._instance) {
            ImageService._instance = new ImageService();
        }
        return ImageService._instance;
    }

    _provider;

    constructor(){
        this._provider = DataProvider.instance;
    }

    /**
     * Restaurant image URL.
     */
    imageUrlForRestaurant(restaurant) {
        if (! restaurant){
            return null;
        }
        return (`/images/${restaurant.photographs.images[0].name}`);
    }

    /**
     * Return the srcSet attribute value for a given restaurant
     */
    srcSetForRestaurant(restaurant) {
        if (! restaurant){
            return null;
        }
        return restaurant.photographs.images
            .map(photo => `/images/${photo.name} ${photo.width}w`)
            .reduce((previous, current) => `${previous}, ${current}`);
    }

    /**
     * Return description of a given restaurant image
     */
    imageDescriptionForRestaurant(restaurant) {
        if (! restaurant){
            return null;
        }
        return restaurant.photographs.description;
    }


    /**
     * Fetch image details from the database and add them to the restaurant objects.
     */
    addImageDetails(restaurants){
        if (! restaurants) {
            return;
        }
        restaurants.forEach(restaurant => this.addImageDetail(restaurant));
    }


    /**
     * Fetch image detail from the database and add it to the restaurant object
     */
    addImageDetail(restaurant) {
        if (! restaurant) {
            return null;
        }
        this._provider.getImageDetails(restaurant.photograph, details => {
            restaurant.photographs = details;
        });
    }
}
