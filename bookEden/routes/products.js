var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

//router.get('/', productsController.main); /* GET - All products */
//router.get('/detail/:id/', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); /* GET - Form to create */
//router.post('/create/', productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/ 
//router.get('/edit/:id', productsController.edit); /* GET - Form to create */
//router.put('/edit/:id', productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
//router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;