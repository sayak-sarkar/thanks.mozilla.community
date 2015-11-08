var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Thanks = mongoose.model('Thanks');

router.param('id', function (req, res, next, id) {
  var query = Thanks.findById(id);

  query.exec(function (err, thanks) {
    if (err) { return next(err); }
    if (!thanks) { return next(new Error("Thanks not found.")); }

    req.thanks = thanks;
    return next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Thanks.find(function (err, thanks) {
		if (err) { return next(err); }
 	 	res.render('index', { thanks: thanks });
	});
});

router.post('/thanks', function (req, res, next) {
	var thanks = new Thanks(req.body);
	thanks.createdOn = Date();
	thanks.save(function (err, thanks) {
		if (err) { return next(err) };

		res.render('thanks', thanks);
	});
});

router.get('/thanks/:id', function(req, res, next) {
  res.render('thanks', req.thanks)
})

module.exports = router;
