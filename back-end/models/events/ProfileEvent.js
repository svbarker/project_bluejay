const mongoose = require('mongoose');

const ProfileEventSchema = new mongoose.Schema(
	{
		profile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const ProfileEvent = Event.discriminator('ProfileEvent', ProfileEventSchema);
module.exports = ProfileEvent;
