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
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

EventSchema.virtual('message').set(function(val) {
	const regex = /%(.+?)%/gi;
	let matches;
	while ((matches = regex.exec(val)) !== null) {
		const [first, second, third] = matches[1].split('.');
		console.log('SPLITS:', first, second, third);
		if (!first || !second) {
			this._message = 'ERROR: UNABLE TO PARSE TEMPLATE';
			return;
		}
		console.log('THIS:', this);
		console.log('FIRST:', this[first]);
		console.log('SECOND:', this[first][second]);
		console.log('THIRD:', this[first][second][third]);

		this._message = val.replace(
			matches[0],
			third ? this[first][second][third] : this[first][second]
		);
	}
	console.log(this._message);
});

EventSchema.virtual('message').get(function() {
	return this._message;
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
