const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TaskSchema = new mongoose.Schema(
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
		],
		status: {
			type: String,
			default: 'Unassigned'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const autoPopulate = function(next) {
	this.populate([
		{
			path: 'students',
			model: 'Student'
		}
	]);
	next();
};

TaskSchema.pre('findOne', autoPopulate);
TaskSchema.pre('findOneAndUpdate', autoPopulate);
TaskSchema.pre('findOneAndRemove', autoPopulate);

TaskSchema.plugin(uniqueValidator);

TaskSchema.methods.hasStudent = function(student) {
	return this.students.some(s => '' + s === student.id);
};

TaskSchema.methods.toString = function() {
	return `${this.title}`;
};

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
