const router = require('express').Router();
const ProductController = require('../../controllers/ProductController');
const controller = new ProductController();

//GET products collection
router.get('/', controller.index);

module.exports = router;