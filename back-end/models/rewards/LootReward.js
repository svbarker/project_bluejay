const mongoose = require('mongoose');
const Reward = require('./Reward');

const LootRewardSchema = new mongoose.Schema(
	{
		cost: {
			type: Number,
			default: 5
		}
	},
	{
		timestamps: true
	}
);

LootRewardSchema.pre('save', function(next) {
	this.kind = 'loot';
	next(this);
});

LootRewardSchema.methods.toString = function() {
	return `${this.kind} (Cost: ${this.cost} points)`;
};

const LootReward = Reward.discriminator('LootReward', LootRewardSchema);
module.exports = LootReward;
