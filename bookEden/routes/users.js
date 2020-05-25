var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersControllers");
var multer = require('multer');
var path = require('path');
let {check, validationResult, body} = require('express-validator');
var guestMiddlewares = require("../middlewares/guestMiddlewares");
var authMiddlewares = require("../middlewares/authMiddlewares");


var storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'public/images/avatars');
	},
	filename:(req,file,cb)=>{
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});

/* --- USERS REGISTER --- */

<<<<<<< HEAD
router.get('/', function(req, res, next) {
	res.render('user-registrado');
  });
router.get('/register', guestMiddlewares, authMiddlewares, usersController.register);
router.post('/register', upload.any(), usersController.create);
=======
router.get('/register', usersController.register);

router.post('/login', upload.any(), usersController.create);
>>>>>>> 1ee6eb1f0198f7128937814e5f30c1c088aa6268


/* --- USERS LOGIN --- */

router.get('/login', usersController.login);

router.post('/profile', [
	check('email').isEmail().withMessage('E-mail inválido'),
	check('password').isLength({min:6}).withMessage('La contrañseña debe tener mas de 6 caractéres')
  
  ], usersController.processLogin);

router.get('/profile', usersController.profile)

module.exports = router;
