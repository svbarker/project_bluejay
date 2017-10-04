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

TeacherSchema.methods.getAllStudents = async function() {
	let students = this.classrooms.reduce(
		(studs, room) => studs.concat(room.students),
		[]
	);
	students = await User.find({ _id: students }).populate([
		{
			path: 'tasks',
			model: 'Task'
		},
		{
			path: 'profile',
			model: 'Profile'
		}
	]);
	return students;
};

TeacherSchema.methods.getStudent = async function(id) {
	const students = await this.getAllStudents();
	if (students && students.length > 0)
		return students.find(student => student.id === id);
	return null;
};

const Teacher = User.discriminator('Teacher', TeacherSchema);
module.exports = Teacher;
