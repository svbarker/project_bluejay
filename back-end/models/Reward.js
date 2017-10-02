const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema(
	{
		kind: {
			type: String,
			default: 'Point'
		},
		description: {
			type: String,
			required: true
		},
		cost: {
			type: Number,
			default: 5
		},
		teacher: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher'
		},
		status: {
			type: String,
			default: 'Unaccepted'
		}
	},
	{
		timestamps: true
	}
);

const Reward = mongoose.model('Reward', RewardSchema);
module.exports = Reward;
