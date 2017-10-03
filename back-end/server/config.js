require('dotenv').config();
const User = require('../models/users/User');

module.exports = {
	port: process.env.PORT || process.argv[2] || 3001,
	host: 'localhost',
	serverCallback: () => {
		console.log('Listening on port 3001');
	},
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
