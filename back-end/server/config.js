require('dotenv').config();
const User = require('../models/users/User');

module.exports = {
	session: {
		secret: process.env.SECRET,
		saveUninitialized: true,
		resave: false
	},
	serialize: (user, done) => {
		done(null, user._id);
	},
	deserialize: (_id, done) => {
		User.findById(_id).then(user => {
			done(null, user);
		});
	}
};
