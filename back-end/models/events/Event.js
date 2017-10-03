const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
	{
		internal: {
			type: Boolean,
			default: false
		},
		message: {
			type: String,
			required: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
