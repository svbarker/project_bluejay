const mongoose = require('mongoose');
const Reward = require('./Reward');

const PointRewardSchema = new mongoose.Schema(
	{
		value: {
			type: Number,
			default: 5
		}
	},
	{
		timestamps: true
	}
);

const PointReward = Reward.discriminator('PointReward', PointRewardSchema);
module.exports = PointReward;
