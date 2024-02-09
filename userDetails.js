const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

// Connecting Mongoose
(async () => {
	try {
		await mongoose.createConnection(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 50000, // Timeout for server selection
			socketTimeoutMS: 45000, // Timeout for individual operations
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
})();
mongoose.set('bufferTimeoutMS', 50000);
// Setting up the schema
const User = new mongoose.Schema({
	username: String,
	password: String,
});

// Setting up the passport plugin
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
