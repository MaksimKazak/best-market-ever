const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
  resource: String,
  price: Number
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;