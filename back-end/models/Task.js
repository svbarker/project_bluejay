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
		class: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Class'
		},
		status: {
			type: String,
			default: 'Unassigned'
		}
	},
	{
		timestamps: true
	}
);

TaskSchema.plugin(uniqueValidator);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
