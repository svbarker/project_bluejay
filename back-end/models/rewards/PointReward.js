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
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

PointRewardSchema.methods.toString = function() {
	return `${this.kind} (Value: ${this.value} points)`;
};

const PointReward = Reward.discriminator('PointReward', PointRewardSchema);
module.exports = PointReward;
