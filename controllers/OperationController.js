const OperationRepository = require('../repositories/OperationRepository');
const operationRepository = new OperationRepository();

class OperationController {
  constructor() {}

  all(req, res) {
    return operationRepository.find()
      .then(operations => res.status(200).send(operations))
      .catch(err => err);
  }

  async index(req, res) {
    let { query: { page, rowsPerPage } } = req;
    try {
      let [operations, count] = await Promise.all([
        operationRepository.find(null, null, { skip: rowsPerPage * page, limit: +rowsPerPage }),
        operationRepository.count()
      ]);
      let responseObj = {
        operations: operations.map(user => user.toJSON()),
        count
      };
      return res.status(200).send(responseObj);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OperationController;