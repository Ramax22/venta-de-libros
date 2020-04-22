var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/registro', function(req, res, next) {
  res.render('register');
});

module.exports = router;
