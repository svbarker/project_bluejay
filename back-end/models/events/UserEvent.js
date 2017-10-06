const mongoose = require("mongoose");
const Event = require("./Event");

const UserEventSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true,
		discriminatorKey: "kind"
	}
);

const UserEvent = Event.discriminator("UserEvent", UserEventSchema);
module.exports = UserEvent;
