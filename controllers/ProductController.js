const Product = require('../models/Product');

class ProductController {
  constructor() {}

  index(req, res) {
    return Product.find()
      .then(products => res.status(200).send(products))
      .catch(err => err);
  }
}