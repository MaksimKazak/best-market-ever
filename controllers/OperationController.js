const ProductRepository = require('../repositories/ProductRepository');
const productRepository = new ProductRepository();
const OperationRepository = require('../repositories/OperationRepository');
const operationRepository = new OperationRepository();
const UserRepository = require('../repositories/UserRepository');
const userRepository = new UserRepository();
const moment = require('moment');
const _ = require('lodash');

class OperationController {
  constructor() {}

  async create(req, res) {
    const { payload: { id }, body: { type, resource, quantity } } = req;

    const [{ price }, user] = await Promise.all([
      productRepository.findOne({ resource }),
      userRepository.findById(id)
    ]);
    let amount = +(price * quantity).toFixed(2);

    let userResourceQuantity = user.resources[resource];
    if (type === 'bought' && user.balance < amount) {
      return res.status(400).send({ message: 'Insufficient funds.' });
    } else if (type === 'sold' && quantity > userResourceQuantity) {
      return res.status(400).send({ message: 'Not enough resources.' });
    }

    let operation = operationRepository.create({
      user: user._id,
      quantity,
      amount,
      resource,
      type,
      createdAt: new Date()
    });
    operationRepository.save(operation);
    user.operations.push(operation._id);

    if (userResourceQuantity) {
      user.resources[resource] = type === 'bought' ? userResourceQuantity + quantity : userResourceQuantity - quantity;
    } else {
      user.resources[resource] = quantity;
    }
    user.markModified('resources');
    user.balance = type === 'bought' ? user.balance - amount : user.balance + amount;
    userRepository.save(user);

    return res.status(202).send(operation);
  }

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