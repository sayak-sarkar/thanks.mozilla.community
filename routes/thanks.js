var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Thanks = mongoose.model('Thanks');

/* Preload the Thanks with this ID. */
router.param('thanks_id', function (req, res, next, id) {
  var query = Thanks.findById(id);

  query.exec(function (err, thanks) {
    if (err) { return next(err); }
    if (!thanks) { return next(new Error("Thanks not found.")); }

    req.thanks = thanks;
    return next();
  });
});

/* POST a new Thanks (accessed at POST /api/thanks). */
router.post('/thanks', function (req, res, next) {
	var thanks = new Thanks(req.body);
	thanks.createdOn = Date();
	thanks.save(function (err, thanks) {
		if (err) { return next(err) };

		res.json(thanks);
	});
});

/* GET all Thanks (accessed at GET /api/thanks). */
router.get('/thanks', function (req, res, next) {
	Thanks.find(function (err, thanks) {
		if (err) { return next(err); }
 	 	res.json(thanks);
	});
});

/* GET the Thanks with this ID (accessed at GET /api/thanks/:thanks_id). */
router.get('/thanks/:thanks_id',function (req, res, next) {
 	res.json(req.thanks);
});

/* UPDATE the Thanks with this ID (accessed at PUT /api/thanks/:thanks_id). */
router.put('/thanks/:thanks_id', function (req, res, next) {
	// update the thanks info
	if (req.body.message) {
		req.thanks.message = req.body.message;
	}
	if (req.body.sender) {
		req.thanks.sender = req.body.sender;
	}
	if (req.body.reciever) {
		req.thanks.reciever = req.body.reciever; 	
	}
	req.thanks.modifiedOn = req.body.modifiedOn;
	// save the Thanks
	req.thanks.save(function(err) {
		if (err)
			res.send(err);

		res.json(req.thanks);
	});
});

/* DELETE the Thanks with this ID (accessed at DELETE /api/thanks/:thanks_id). */
router.delete('/thanks/:thanks_id', function (req, res, next) {
	Thanks.remove({_id: req.thanks._id}, function (err, thanks) {
		if (err)
			res.send(err);

		res.json({ message: 'Thanks successfully deleted.' });
	});
});

module.exports = router;