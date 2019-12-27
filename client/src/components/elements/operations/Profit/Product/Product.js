import React from 'react';
import Typography from "@material-ui/core/Typography";

function Product({ user: { operations }, product }) {
  let profit = operations.reduce((acc, { type, amount, resource }) => {
    if (resource === product.resource) {
      return type === 'sold' ? acc + amount : acc - amount;
    }
    return acc;
  }, 0);

  return (
    <div>{product.resource}: <Typography className='text-left inline'>{profit.toFixed(2)} $</Typography></div>
  );
}

export default Product;