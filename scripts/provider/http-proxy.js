class HttpProxy {
    static _instance;

    /**
     * Static factory method.
     *
     * Opening the database seems to be an expensive operation so I'll open and store a reference to it once,
     * and model this class as a singleton to ensure that everyone uses the same instance.
     */
    static get instance() {
        return new Promise((resolve, reject) => {
            if (! HttpProxy._instance) {
                HttpProxy._instance = new HttpProxy();
            }
            resolve(IdbProxy._instance);
        });
    }
}
