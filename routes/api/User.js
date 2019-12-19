const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');

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
  let users = await User.find();
  return res.status(200).send(users.map(user => user.toJSON()));
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