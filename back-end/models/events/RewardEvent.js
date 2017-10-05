const mongoose = require('mongoose');
const Event = require('./Event');

const RewardEventSchema = new mongoose.Schema(
	{
		reward: {
			type: Object,
			required: true
		},
		user: {
			type: Object,
			required: true
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const RewardEvent = Event.discriminator('RewardEvent', RewardEventSchema);
module.exports = RewardEvent;
