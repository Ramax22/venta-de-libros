var express = require('express');
var router = express.Router();

router.get('/carrito', function(req, res, next) {
    res.send('carrito');
  });
  
  module.exports = router;