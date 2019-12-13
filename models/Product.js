const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
  resource: String,
  price: Number
});

mongoose.model('User', productSchema);