var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/iniciar', function(req, res, next) {
  res.render('log-in');
});

module.exports = router;
