const ProductRepository = require('../repositories/ProductRepository');
const productRepository = new ProductRepository();
const [minDiff, maxDiff] = [-10, 10];

module.exports = class {
  listeners = [];
  interval = null;

  run() {
    this.interval = setInterval(async () => {
      let products = await productRepository.all();
      products.forEach(product => {
        const diff = randomInRange(minDiff, maxDiff);
        if ((product.price += diff) > 1) {
          product.save();
        }
      });
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