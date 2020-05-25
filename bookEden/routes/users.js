var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersControllers");
var multer = require('multer');
var path = require('path');
let {check, validationResult, body} = require('express-validator');


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

router.get('/register', usersController.register);
router.post('/register', upload.any(), usersController.create);

/* --- USERS LOGIN --- */

router.get('/login', usersController.login);

router.post('/profile', [
	check('email').isEmail().withMessage('E-mail inválido'),
	check('password').isLength({min:6}).withMessage('La contrañseña debe tener mas de 6 caractéres')
  
  ], usersController.processLogin);

router.get('/check', function(req, res){
	if(req.session.userLogged == undefined){
		res.send('no estás logueado')
	} else {
		res.send('el usuario logueado es: '+ req.session.userLogged.email);
	}
})

router.get('login-hecho', function (req,res){
	res.render('login-hecho')
})

router.get('/profile', usersController.profile)

module.exports = router;
