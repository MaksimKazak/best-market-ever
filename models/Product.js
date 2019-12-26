const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
  resource: String,
  price: Number
});

module.exports = mongoose.model('Product', productSchema);