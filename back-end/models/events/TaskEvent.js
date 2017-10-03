const mongoose = require('mongoose');
const Event = require('./Event');

const TaskEventSchema = new mongoose.Schema(
	{
		task: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile',
			required: true
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const TaskEvent = Event.discriminator('TaskEvent', TaskEventSchema);
module.exports = TaskEvent;
