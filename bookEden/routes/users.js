var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersControllers");
var multer = require('multer');
var path = require('path');
let {check, validationResult, body} = require('express-validator');
var guestMiddlewares = require("../middlewares/guestMiddlewares");
var authMiddlewares = require("../middlewares/authMiddlewares");
var adminMiddlewares = require('../middlewares/adminMiddleware');


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

router.get('/register', guestMiddlewares, usersController.register);

router.post('/register', upload.any(), [
	check('first_name').isString().notEmpty().withMessage('Nombre inválido'),
	check('last_name').isString().notEmpty().withMessage('Apellido inválido'),
	check('email').isEmail().withMessage('E-mail inválido'),
	check('password').isString().notEmpty().withMessage('Contraseña inválida'),
	check('password').isLength({min:6}).withMessage('La contrañseña debe tener mas de 6 caractéres')
], usersController.create);

/* --- USERS LOGIN --- */

router.get('/login', guestMiddlewares, usersController.login);

router.post('/profile', [
	check('email').isEmail().withMessage('E-mail inválido'),
	check('password').isLength({min:6}).withMessage('La contrañseña debe tener mas de 6 caractéres')
  
  ], usersController.processLogin);

router.get('/profile', authMiddlewares, usersController.profile);

router.get('/logout', usersController.logout);

/* --- ADMIN ROUTES --- */

router.get('/admin', adminMiddlewares.check ,usersController.admin);

module.exports = router;