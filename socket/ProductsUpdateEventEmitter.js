const ProductRepository = require('../repositories/ProductRepository');
const productRepository = new ProductRepository();
const EventBus = require('../modules/EventBus');
const [minDiff, maxDiff] = [-10, 10];

const randomInRange = (min, max) => {
  return +(Math.random() * (max - min) + min).toFixed(2);
};

class ProductsUpdateEventEmitter {
  static EVENT_NAME = 'productsUpdate';
  #eventBus = new EventBus();
  interval = null;

  run() {
    this.interval = setInterval(async () => {
      let products = await productRepository.all();
      products = await Promise.all(products.map(product => {
        const diff = randomInRange(minDiff, maxDiff);
        const result = +(product.price + diff).toFixed(2);
        if (result > 1) {
          product.price = result;
          return productRepository.save(product);
        }
        return Promise.resolve(product);
      }));
      this.#eventBus.emit(ProductsUpdateEventEmitter.EVENT_NAME, products);
    }, 60000);
  }

  stop() {
    clearInterval(this.interval);
  }

  addListener(listener) {
    this.#eventBus.on(ProductsUpdateEventEmitter.EVENT_NAME, listener);
  }

  removeListener(listener) {
    this.#eventBus.off(ProductsUpdateEventEmitter.EVENT_NAME, listener);
  }
}

module.exports = ProductsUpdateEventEmitter;