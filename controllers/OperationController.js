const ProductRepository = require('../repositories/ProductRepository');
const OperationRepository = require('../repositories/OperationRepository');
const productRepository = new ProductRepository();
const operationRepository = new OperationRepository();
const moment = require('moment');
const _ = require('lodash');

class OperationController {
  constructor() {}

  all(req, res) {
    return operationRepository.find()
      .then(operations => res.status(200).send(operations))
      .catch(err => err);
  }

  async index(req, res) {
    const { payload: { id } } = req;
    const { query: { page, rowsPerPage } } = req;
    try {
      let [operations, count] = await Promise.all([
        operationRepository.find({ user: id }, null, { skip: rowsPerPage * page, limit: +rowsPerPage }),
        operationRepository.count()
      ]);
      let responseObj = {
        operations,
        count
      };
      return res.status(200).send(responseObj);
    } catch (err) {
      throw err;
    }
  }

  async profit(req, res) {
    const { payload: { id } } = req;
    let [operations, products] = await Promise.all([
      operationRepository.find({ user: id }),
      productRepository.all()
    ]);
    let responseObject = {
      general: operations.reduce((acc, { type, amount }) => {
        return type === 'sold' ? acc + amount : acc - amount;
      }, 0)
    };
    for (let product of products) {
      responseObject[product.resource] = operations.reduce((acc, { type, amount, resource }) => {
        if (resource === product.resource) {
          return type === 'sold' ? acc + amount : acc - amount;
        }
        return acc;
      }, 0);
    }
    return res.status(200).send(responseObject);
  }

  async recent(req, res) {
    const { payload: { id } } = req;
    let dayEarlier = moment().subtract(1, 'day');
    let operations = await operationRepository.find({ user: id, createdAt: { $gte: dayEarlier } });
    let recentOperations = _.groupBy(
      operations,
      'resource'
    );

    for (let resource in recentOperations) {
      if (recentOperations.hasOwnProperty(resource)) {
        // group grouped by resource operations by type(sold/bought)
        recentOperations[resource] = _.groupBy(
          recentOperations[resource],
          'type'
        );
        // convert grouped arrays of operations into quantities of items
        for (let type in recentOperations[resource]) {
          if (recentOperations[resource].hasOwnProperty(type)) {
            recentOperations[resource][type] = recentOperations[resource][type].reduce((acc, { quantity }) => acc + quantity, 0);
          }
        }
      }
    }

    return res.status(200).send(recentOperations);
  }
}

module.exports = OperationController;