const { User } = require("../models");
const Events = require("./events");

module.exports = io => client => {
	const loggedInHandler = async data => {
		await User.findByIdAndUpdate(
			data,
			{ $set: { socketId: client.id } },
			{ new: true }
		);
		io.to(client.id).emit(Events.REFRESH_NOTIFICATIONS);
	};
	client.on(Events.USER_LOGGED_IN, loggedInHandler);
};
