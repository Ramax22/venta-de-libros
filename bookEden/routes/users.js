var express = require('express');
var router = express.Router();
var registerController = require("../controllers/usersControllers");
var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'public/images/avatars');
	},
	filename:(req,file,cb)=>{
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
  res.render('log-in');
});
router.get('/register', registerController.register);
router.post('/register', upload.any(), registerController.create);



module.exports = router;
