const ProductRepository = require('../repositories/ProductRepository');
const productRepository = new ProductRepository();

class ProductController {
  constructor() {}

  index(req, res) {
    return productRepository.all()
      .then(products => res.status(200).send(products))
      .catch(err => err);
  }
}

module.exports = ProductController;