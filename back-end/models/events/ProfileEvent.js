const mongoose = require('mongoose');
const Event = require('./Event');

const ProfileEventSchema = new mongoose.Schema(
	{
		profile: {
			type: Object,
			required: true
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const ProfileEvent = Event.discriminator('ProfileEvent', ProfileEventSchema);
module.exports = ProfileEvent;
