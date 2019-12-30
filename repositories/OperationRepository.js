const Operation = require('../models/Operation');

class OperationRepository {
  find(...args) {
    return Operation.find(...args);
  }

  count() {
    return Operation.countDocuments();
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

module.exports = OperationRepository;