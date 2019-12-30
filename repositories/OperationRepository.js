const Operation = require('../models/Operation');

class ProductRepository {
  all() {
    return Operation.find();
  }

  findOne(...args) {
    return Operation.findOne(...args);
  }

  create(body) {
    return new Operation(body);
  }

  save(operation) {
    return operation.save()
  }
}

module.exports = ProductRepository;