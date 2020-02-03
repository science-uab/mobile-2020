const express = require('express');
const router = express.Router();
const Anunturi = require('../models/anunturi.model');
/* GET users listing. */
router.get('/:id', (req, res, next) => {
  Anunturi.findById(req.params.id).then(anunturi => {
    res.json(anunturi);
  }).catch(error => {
    res.json(error)
  });
});
router.get('/', (req, res, next) => {
  Anunturi.findAll().then(anunturi => {
      res.json(anunturi);
  }).catch(error => {
      res.json(error)
  })
});
router.post('/', (req, res, next) => {
  Anunturi.create(req.body).then((anunturi) => {
    res.redirect('/');
  }).catch(error => {
      console.log(error);
      res.json(error)
  })
});
router.post('/edit/:id', (req, res, next) => {
  Anunturi.update(
    req.body, 
    {
      where: { 
        id: req.params.id
      }
    }
  ).then((rowUpdated) => {
    if(rowUpdated[0] === 1) {
        res.redirect('/');
    }
  }).catch(error => {
      console.log(error);
      res.json(error)
  })
});
router.post('/delete/:id', (req, res, next) => {
  Anunturi.destroy({
    where: { 
      id: req.params.id
    }
  }).then((rowDeleted) => {
    if(rowDeleted === 1) {
        console.log(rowDeleted);
        res.redirect('/');
  }
  }).catch(error => {
      console.log(error);
      res.json(error)
  })
});

module.exports = router;
