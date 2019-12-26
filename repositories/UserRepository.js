const User = require('../models/User');

class UserRepository {
  create(body) {
    return new User(body);
  }

  save(user) {
    return user.save();
  }

  all() {
    return User.find();
  }

  findById(...args) {
    return User.findById(...args);
  }

  find(...args) {
    return User.find(...args);
  }

  findOne(...args) {
    return User.findOne(...args);
  }

  count() {
    return User.count();
  }
}

module.exports = UserRepository;