var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const indexController = require('../controllers/indexController');
const cartControllers = require('../controllers/cartControllers');

/* GET home page. */
router.get('/', indexController.main); 

/* -- CARRITO -- */
/*router.get('/cart', cartControllers.carga);
router.get('/agrgar:externo', cartControllers.agregar);*/
router.get('/cart', cartControllers.carrito);


module.exports = router;
