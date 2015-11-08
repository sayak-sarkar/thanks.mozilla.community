var mongoose = require('mongoose');

var ThanksSchema = new mongoose.Schema({
	message: String,
	sender: String,
	reciever: String,
	createdOn: Date,
	modifiedOn: Date
});

mongoose.model('Thanks', ThanksSchema);