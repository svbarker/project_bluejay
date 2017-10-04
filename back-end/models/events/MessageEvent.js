const mongoose = require('mongoose');
const Event = require('./Event');

const MessageEventSchema = new mongoose.Schema(
	{
		_body: {
			type: String
		},
		user: {
			type: Object,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

function bodyTemplateParser(val) {
	this._body = val;
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
			this._body = `ERROR: UNABLE TO PARSE TEMPLATE (${val})`;
		}

		this._body = this._body.replace(
			matches[0],
			third ? this[first][second][third] : this[first][second]
		);
	}
}

MessageEventSchema.virtual('body').set(bodyTemplateParser);

MessageEventSchema.virtual('body').get(function() {
	return this._body;
});

const MessageEvent = Event.discriminator('MessageEvent', MessageEventSchema);
module.exports = MessageEvent;
