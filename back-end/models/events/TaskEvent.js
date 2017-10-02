const mongoose = require('mongoose');

const TaskEventSchema = new mongoose.Schema(
	{
		task: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const TaskEvent = Event.discriminator('TaskEvent', TaskEventSchema);
module.exports = TaskEvent;
