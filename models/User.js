const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  balance: Number,
  type: String,
  password: String,
  token: String,
  operations: [{
    quantity: Number,
    amount: Number,
    resource: String,
    type: String,
    createdAt: Date
  }]
});

mongoose.model('User', userSchema);