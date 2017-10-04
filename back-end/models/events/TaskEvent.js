const mongoose = require('mongoose');
const Event = require('./Event');

const TaskEventSchema = new mongoose.Schema(
	{
		task: {
			type: Object,
			required: true
		},
		user: {
			type: Object
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const TaskEvent = Event.discriminator('TaskEvent', TaskEventSchema);
module.exports = TaskEvent;
