const mongoose = require('mongoose');

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

TaskSchema.methods.hasStudent = function(student) {
	return this.students.some(s => '' + s === student.id);
};

TaskSchema.methods.toString = function() {
	return `${this.title}`;
};

TaskSchema.methods.toNewObject = function() {
	const newObj = this.toObject();
	delete newObj._id;
	return newObj;
};

TaskSchema.methods.addStudent = function(student) {
	const index = this.students.findIndex(stud => {
		return stud.id === student.id;
	});
	if (index > -1) {
		this.students[index] = student.id;
	} else {
		this.students[0] = student.id;
	}
};

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
