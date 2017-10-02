const mongoose = require('mongoose');

const RewardEventSchema = new mongoose.Schema(
	{
		reward: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const RewardEvent = Event.discriminator('RewardEvent', RewardEventSchema);
module.exports = RewardEvent;
