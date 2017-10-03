const mongoose = require('mongoose');
const Event = require('./Event');

const MessageEventSchema = new mongoose.Schema(
	{
		body: {
			type: String,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		task: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const MessageEvent = Event.discriminator('MessageEvent', MessageEventSchema);
module.exports = MessageEvent;
