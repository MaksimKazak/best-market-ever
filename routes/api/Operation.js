const router = require('express').Router();
const OperationController = require('../../controllers/OperationController');
const auth = require('../auth');
const controller = new OperationController();

//GET operations collection
router.get('/', auth.required, controller.index);
router.get('/profit', auth.required, controller.profit);
router.get('/recent-activities', auth.required, controller.recentActivities);

module.exports = router;