const router = require('express').Router();
const OperationController = require('../../controllers/OperationController');
const auth = require('../auth');
const controller = new OperationController();

//GET operations collection
router.get('/', auth.required, controller.index);

//GET operations profit
router.get('/profit', auth.required, controller.profit);

//GET recent operations
router.get('/recent', auth.required, controller.recent);

//POST create operation
router.post('/', auth.required, controller.create);

module.exports = router;