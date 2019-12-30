const router = require('express').Router();
const OperationController = require('../../controllers/OperationController');
const controller = new OperationController();

//GET operations collection
router.get('/', controller.index);

module.exports = router;