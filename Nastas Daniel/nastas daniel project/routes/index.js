const express = require('express');
const router = express.Router();
const Anunturi = require('../models/anunturi.model');
/* GET home page. (Anunturi) */
router.get('/', function(req, res, next) {
  Anunturi.findAll().then(anunturi => {
    res.render('index', { anunturi: anunturi });
  }).catch(error => {
    res.json(error)
  })
});

module.exports = router;
