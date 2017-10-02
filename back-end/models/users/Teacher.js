const mongoose = require('mongoose');
const User = require('./User');

const TeacherSchema = new mongoose.Schema(
	{
		about: String
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const Teacher = User.discriminator('Teacher', TeacherSchema);
module.exports = Teacher;
