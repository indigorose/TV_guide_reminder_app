const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

// Connecting Mongoose

mongoose
	.connect(process.env.MONGODB_URI)
	.then((ans) => {
		console.log('Connection Successful');
	})
	.catch((err) => {
		console.error(err);
		console.log('Error in the connection');
	});

// Setting up the schema
const User = new mongoose.Schema({
	username: String,
	password: String,
});

// Setting up the passport plugin
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
