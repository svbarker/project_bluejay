const mongoose = require('mongoose');
const Event = require('./Event');

const ClassroomEventSchema = new mongoose.Schema(
	{
		classroom: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Classroom'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const ClassroomEvent = Event.discriminator(
	'ClassroomEvent',
	ClassroomEventSchema
);
module.exports = ClassroomEvent;
