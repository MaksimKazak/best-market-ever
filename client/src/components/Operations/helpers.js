import moment from 'moment';
import _ from 'lodash';

const computeRecent = (operations) => {
  let dayEarlier = moment().subtract(1, 'day');
  let recentOperations = _.groupBy(
    operations.filter(operation => moment(operation.createdAt).isAfter(dayEarlier)),
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

  return recentOperations;
};

const computeProfit = (operations, products) => {
  let profit = {
    general: operations.reduce((acc, { type, amount }) => {
      return type === 'sold' ? acc + amount : acc - amount;
    }, 0)
  };
  products.forEach(product => {
    profit[product.resource] = operations.reduce((acc, { type, amount, resource }) => {
      if (resource === product.resource) {
        return type === 'sold' ? acc + amount : acc - amount;
      }
      return acc;
    }, 0);
  });
  return profit;
};

export { computeProfit, computeRecent };