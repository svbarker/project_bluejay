const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
	{
		internal: {
			type: Boolean,
			default: true
		},
		_message: {
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

EventSchema.virtual('message').set(function(val) {
	this._message = val;
	const regex = /%(.+?)%/gi;
	let matches;

	while ((matches = regex.exec(val)) !== null) {
		const [first, second, third] = matches[1].split('.');

		if (
			!first ||
			(first && !second) ||
			!second ||
			!this[first] ||
			(this[first] && !this[first][second])
		) {
			this._message = `ERROR: UNABLE TO PARSE TEMPLATE (${val})`;
			return;
		}

		this._message = this._message.replace(
			matches[0],
			third ? this[first][second][third] : this[first][second]
		);
	}
});

EventSchema.virtual('message').get(function() {
	return this._message;
});

EventSchema.methods.toString = function() {
	return this._message;
};

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
