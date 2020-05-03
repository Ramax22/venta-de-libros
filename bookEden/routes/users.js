var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/iniciar', function(req, res, next) {
  res.render('log-in');
});
router.get('/registro', function(req, res, next) {
  res.render('register');
});


module.exports = router;
