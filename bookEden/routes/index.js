var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const indexController = require('../controllers/indexController');
const cartControllers = require('../controllers/cartControllers');

/* GET home page. */
router.get('/', indexController.main); 

/* -- CARRITO -- */
<<<<<<< HEAD
/*router.get('/cart', cartControllers.carga);
router.get('/agrgar:externo', cartControllers.agregar);*/
router.get('/cart', cartControllers.carrito);

=======
//router.get('/cart', indexController.carrito);
>>>>>>> 0b42049cdbce2dabfe94ce018bbb082aca5d8212

module.exports = router;
