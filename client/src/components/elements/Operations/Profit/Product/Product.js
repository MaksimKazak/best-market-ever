import React from 'react';
import Typography from "@material-ui/core/Typography";

function Product({ product, profit }) {

  return (
    <div>{product.resource}: <Typography className='text-left inline'>{profit.toFixed(2)} $</Typography></div>
  );
}

export default Product;