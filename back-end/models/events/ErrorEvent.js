const mongoose = require('mongoose');
const Event = require('./Event');

const ErrorEventSchema = new mongoose.Schema(
	{
		error: {
			type: Object
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const ErrorEvent = Event.discriminator('ErrorEvent', ErrorEventSchema);
module.exports = ErrorEvent;
