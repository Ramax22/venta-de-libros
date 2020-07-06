var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const cartController = require('../controllers/cartController');

/* -- CARRITO -- */
router.get('/', cartController.carrito);

router.post('/', cartController.create);
router.delete('/delete/:id',cartController.delete)


module.exports = router;