const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body } = req;

  if(!body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User(body);

  finalUser.setPassword(body.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body } = req;

  if(!body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
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

      return res.json({ user: user.toAuthJSON() });
    });
});

//GET users collection
router.get('/', async (req, res) => {
  let users = await User.find();
  return res.status(200).send(users);
});

//PUT update user by id
router.put('/:id', async (req, res) => {
  const {id} = req.params;

  let user = await User.findByIdAndUpdate(id, req.body);

  return res.status(202).send({
    error: false,
    user
  });
});

module.exports = router;