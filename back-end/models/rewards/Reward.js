const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema(
	{
		kind: {
			type: String,
			enum: ['loot', 'point']
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
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

RewardSchema.methods.toNewObject = function() {
	const newObj = this.toObject();
	delete newObj._id;
	return newObj;
};

const Reward = mongoose.model('Reward', RewardSchema);
module.exports = Reward;
