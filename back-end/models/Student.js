const mongoose = require('mongoose');
const User = require('./User');

const StudentSchema = new mongoose.Schema(
	{},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const Student = User.discriminator('Student', StudentSchema);
module.exports = Student;
