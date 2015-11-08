var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/thanks/:id', function(req, res, next) {
  res.render('thanks', { reciever: 'Dino', message: 'Thx', sender: 'Foxy', id: req.params.id })
})

module.exports = router;
