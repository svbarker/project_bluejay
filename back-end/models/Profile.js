const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const ProfileSchema = new mongoose.Schema(
	{
		title: String,
		displayName: String,
		avatar: String,
		gender: String,
		fname: String,
		lname: String
	},
	{
		timestamps: true
	}
);

ProfileSchema.plugin(uniqueValidator);

ProfileSchema.virtual('fullname').get(function() {
	return this.fname + ' ' + this.lname;
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
