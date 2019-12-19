const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'common'
  },
  hash: String,
  salt: String,
  token: String,
  operations: [{
    quantity: Number,
    amount: Number,
    resource: String,
    type: String,
    createdAt: Date
  }]
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    balance: this.balance,
    type: this.type,
    operations: this.operations,
    token: this.generateJWT(),
  };
};

userSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    balance: this.balance,
    type: this.type,
    operations: this.operations,
  };
};

userSchema.plugin(uniqueValidator, { message: '{PATH} already being used.' });

mongoose.model('User', userSchema);