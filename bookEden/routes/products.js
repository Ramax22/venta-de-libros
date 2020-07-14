var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
let {check, validationResult, body } = require('express-validator')



var storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'public/images/products');
	},
	filename:(req,file,cb)=>{
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

router.get('/', productsController.main); /* GET - All products */
router.get('/detail/:id', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/',productsController.create); /* GET - Form to create */
router.post('/create/', upload.any(),[
	check("title").isLength({min:5}).withMessage("nombre invalido minimo 5 caracteres"),
	check("description").isLength({min:20}).withMessage("minimo 20 caracteres")
] ,productsController.created); /* POST - Store in DB */
// ,function(req,res,next){
// 		console.log("entreeee")
// 		console.log(req.body.files)
// 		if(req.body.files==undefined){
// 			console.log("estoy en el iff")
// 			let errors=validationResult(req)
// 			console.log(errors)
// 			errors.errors.push({
// 				value: '',
// 				  msg: 'ingrese otra imagen',
// 				 param: 'image',
// 				location: 'body'
// 			})
// 			next();
// 		}else{
// 			let extension= path.extname(req.files[0].originalname)
// 			if(extension==".jpg"||extension==".jpeg"||extension==".png"||extension==".gif"){
// 			 console.log(path.extname(req.files[0].originalname))
// 			console.log("funciono")
// 			next();
// 			}
// 		}
// }


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); /* GET - Form to create */
router.put('/edit/:id', upload.any(),[
	check("name").isLength({min:5}).withMessage("nombre invalido minimo 5 caracteres"),
	check("description").isLength({min:20}).withMessage("minimo 20 caracteres")
], productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */

/*** AUTHOR ***/
router.get('/authors', productsController.authors);
router.post('/authors',[
	check('authorName').isLength().withMessage('Este campo debe estar lleno'),
], productsController.authorSafe);

/*** PUBLISHER ***/
router.get('/publishers', productsController.publishers);
router.post('/publishers',[
	check('publisher').isLength().withMessage('Este campo debe estar lleno'),
], productsController.publisherSafe);


/*** SEARCH ***/
router.get('/results', productsController.results);



module.exports = router;
