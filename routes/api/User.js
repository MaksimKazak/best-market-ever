const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');
const Product = mongoose.model('Product');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body } = req;

  if (!body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User(body);

  finalUser.setPassword(body.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch(err => {
      return res.status(400).send(err);
    });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body } = req;

  if (!body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      user.save();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.sendStatus(401);
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toJSON() });
    });
});

//POST logout route (required, only authenticated users have access)
router.post('/logout', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      user.token = null;
      user.save();

      return res.json({ user: user.toJSON() });
    });
});

//GET users collection
router.get('/', async (req, res) => {
  let { query: { page, rowsPerPage } } = req;
  try {
    let [users, count] = await Promise.all([
      User.find(null, null, { skip: rowsPerPage * page, limit: +rowsPerPage }),
      User.count()
    ]);
    let responseObj = {
      users: users.map(user => user.toJSON()),
      count
    };
    return res.status(200).send(responseObj);
  } catch (err) {
    throw err;
  }
});

router.put('/buy', auth.required, async (req, res) => {
  const { payload: { id }, body: { resource, quantity } } = req;

  const [{ price }, user] = await Promise.all([Product.findOne({ resource }), User.findById(id)]);
  let amount = price * quantity;

  if (user.balance < amount) {
    return res.status(400).send('Insufficient funds.');
  }

  user.operations.push({
    quantity,
    amount,
    resource,
    type: 'bought',
    createdAt: new Date()
  });
  let userResourceQuantity = user.resources[resource];
  user.resources[resource] = userResourceQuantity ? userResourceQuantity + quantity : quantity;
  user.markModified('resources');
  user.balance -= amount;

  return user.save()
    .then(() => {
      return res.status(202).send(user.toJSON())
    })
    .catch(err => err);
});

router.put('/sell', auth.required, async (req, res) => {
  const { payload: { id }, body: { resource, quantity } } = req;

  const [{ price }, user] = await Promise.all([Product.findOne({ resource }), User.findById(id)]);
  let amount = price * quantity;

  let userResourceQuantity = user.resources[resource];
  if (quantity > userResourceQuantity) {
    return res.status(400).send('Not enough resources.');
  }

  user.resources[resource] = userResourceQuantity ? userResourceQuantity - quantity : quantity;
  user.markModified('resources');
  user.balance += amount;
  user.operations.push({
    quantity,
    amount,
    resource,
    type: 'sold',
    createdAt: new Date()
  });

  return user.save()
    .then(() => {
      return res.status(202).send(user.toJSON())
    })
    .catch(err => err);
});

//PUT update user by id
router.put('/:id', async (req, res) => {
  const {id} = req.params;

  let user = await User.findByIdAndUpdate(id, req.body);

  return res.status(202).send({
    error: false,
    user: user.toJSON()
  });
});

module.exports = router;