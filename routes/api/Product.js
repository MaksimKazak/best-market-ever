const mongoose = require('mongoose');
const router = require('express').Router();
const Product = mongoose.model('Product');

//GET products collection
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).send(products);
  } catch (err) {
    throw err;
  }
});

module.exports = router;