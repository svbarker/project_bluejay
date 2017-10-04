const mongoose = require('mongoose');
const Event = require('./Event');

const MessageEventSchema = new mongoose.Schema(
	{
		body: {
			type: String,
			required: true
		},
		user: {
			type: Object,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const MessageEvent = Event.discriminator('MessageEvent', MessageEventSchema);
module.exports = MessageEvent;
