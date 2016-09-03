var express = require('express');
var router = express.Router();
var modelsInfo = require('../models/info');
var urlencode = require('urlencode');
var urllib = require('urllib');

/* GET users listing. */
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('tryPage', {title: '123'});
});


module.exports = router;
