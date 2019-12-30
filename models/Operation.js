const mongoose = require('mongoose');
const {Schema} = mongoose;

const operationSchema = new Schema({
  resource: String,
  quantity: Number,
  amount: Number,
  type: String,
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

let Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;