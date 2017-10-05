const mongoose = require('mongoose');
const Student = require('../users/Student');
const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		rewards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Reward'
			}
		],
		teacher: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher'
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student'
			}
		],
		classroom: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Classroom'
			}
		]
	},
	{
		timestamps: true,
		discriminatorKey: 'status'
	}
);

const autoPopulate = function(next) {
	this.populate([
		{
			path: 'students',
			Model: 'Student',
			populate: {
				path: 'profile',
				model: 'Profile'
			}
		}
	]);
	next();
};

TaskSchema.pre('findOne', autoPopulate);
TaskSchema.pre('findOneAndUpdate', autoPopulate);
TaskSchema.pre('findOneAndRemove', autoPopulate);

TaskSchema.methods.toString = function() {
	return `${this.title}`;
};

TaskSchema.methods.toNewObject = function() {
	const newObj = this.toObject();
	delete newObj.status;
	delete newObj._id;
	return newObj;
};

TaskSchema.methods.addStudent = async function(student) {
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

TaskSchema.methods.removeStudent = async function(student) {
	const index = this.students.findIndex(stud => {
		return stud.id === student.id;
	});

	if (index > -1) {
		return this.students.splice(index, 1)[0];
	}
	return null;
};

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
