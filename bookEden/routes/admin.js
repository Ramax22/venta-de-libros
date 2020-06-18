var express = require('express');
var router = express.Router();
var adminController=require('../controllers/adminController');
router.get('/form',adminController.login)
router.post('/form',adminController.process)

  module.exports = router;