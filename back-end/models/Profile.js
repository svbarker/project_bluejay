const mongoose = require('mongoose');

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

ProfileSchema.virtual('fullname').get(function() {
	return this.fname + ' ' + this.lname;
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
