const router = require('express').Router();
const OperationController = require('../../controllers/OperationController');
const auth = require('../auth');
const controller = new OperationController();

//GET operations collection
router.get('/', auth.required, controller.index);

module.exports = router;