const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const createSignedSessionId = require('../services/session');

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		passwordHash: String,
		profile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile"
		},
		classes: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Class"
		}],
		tasks: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task"
		}],
		rewards: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Reward"
		}]
		notifications: [{
			message: {
				type: String,
				required: true
			},
			notificationType: {
				type: String,
				required: true
			},
		}]
		sessionToken: String
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('fullname').get(function() {
	return this.profile.fullname;
});

UserSchema.virtual('password').set(function(val) {
	this.passwordHash = bcrypt.hashSync(val, 10);
});

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.pre('save', function(next) {
	this.sessionToken = createSignedSessionId(this.username);
	next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
