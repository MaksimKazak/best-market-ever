const Product = require('../models/Product');

class ProductRepository {
  all() {
    return Product.find();
  }

  findOne(...args) {
    return Product.findOne(...args);
  }

  save(product) {
    return product.save();
  }
}

module.exports = ProductRepository;