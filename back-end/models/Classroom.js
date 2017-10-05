const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Student } = require('./users');

const ClassroomSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		description: {
			type: String,
			required: true
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student'
			}
		],
		teachers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Teacher'
			}
		]
	},
	{
		timestamps: true
	}
);

const autoPopulate = function(next) {
	this.populate([
		{
			path: 'students',
			populate: {
				path: 'profile',
				model: 'Profile'
			}
		},
		{
			path: 'teachers',
			populate: {
				path: 'profile',
				model: 'Profile'
			}
		}
	]);
	next();
};

ClassroomSchema.pre('findOne', autoPopulate);
ClassroomSchema.pre('findOneAndUpdate', autoPopulate);
ClassroomSchema.pre('findOneAndRemove', autoPopulate);

ClassroomSchema.methods.addStudent = async function(student) {
	const index = this.students.findIndex(stud => {
		return stud.id === student.id;
	});

	if (index > -1) {
		this.students[index] = student;
	} else {
		this.students[this.students.length] = student;
	}
	await this.update({ students: this.students });
};

ClassroomSchema.methods.removeStudent = async function(student) {
	const index = this.students.findIndex(stud => {
		return stud.id === student.id;
	});

	if (index > -1) {
		return this.students.splice(index, 1)[0];
	}
	return null;
};

ClassroomSchema.methods.addTeacher = async function(teacher) {
	const index = this.teachers.findIndex(teach => {
		return teach.id === teacher.id;
	});

	if (index > -1) {
		this.teachers[index] = teacher;
	} else {
		this.teachers[this.teachers.length] = teacher;
	}
	await this.update({ teachers: this.teachers });
};

ClassroomSchema.methods.removeTeacher = async function(teacher) {
	const index = this.teachers.findIndex(teach => {
		return teach.id === teacher.id;
	});

	if (index > -1) {
		return this.teachers.splice(index, 1)[0];
	}
	return null;
};

ClassroomSchema.methods.getPopulatedStudents = async function() {
	return await Student.find({ _id: this.students }).populate({
		path: 'profile',
		model: 'Profile'
	});
};

ClassroomSchema.plugin(uniqueValidator);

ClassroomSchema.methods.toString = function() {
	return `${this.title}`;
};

const Classroom = mongoose.model('Classroom', ClassroomSchema);
module.exports = Classroom;
