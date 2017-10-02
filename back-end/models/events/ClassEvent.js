const mongoose = require('mongoose');
const Event = require('./Event');

const ClassEventSchema = new mongoose.Schema(
	{
		class: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const ClassEvent = Event.discriminator('ClassEvent', ClassEventSchema);
module.exports = ClassEvent;
