const router = require('express').Router();
const auth = require('../auth');
const UserController = require('../../controllers/UserController');
const controller = new UserController();

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, controller.create);

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, controller.login);

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, controller.current);

//POST logout route (required, only authenticated users have access)
router.post('/logout', auth.required, controller.logout);

//GET users collection
router.get('/', auth.required, controller.index);

module.exports = router;