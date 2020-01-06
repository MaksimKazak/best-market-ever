const ProductRepository = require('../repositories/ProductRepository');
const productRepository = new ProductRepository();
const [minDiff, maxDiff] = [-10, 10];

module.exports = class {
  listeners = [];
  interval = null;

  run() {
    this.interval = setInterval(async () => {
      let products = await productRepository.all();
      products = await Promise.all(products.map(product => {
        const diff = randomInRange(minDiff, maxDiff);
        const result = product.price + diff;
        if (result > 1) {
          product.price = result;
          return productRepository.save(product);
        }
        return Promise.resolve(product);
      }));
      this.listeners.forEach(listener => listener(products));
    }, 60000);
  }

  stop() {
    clearInterval(this.interval);
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
};

function randomInRange (min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}