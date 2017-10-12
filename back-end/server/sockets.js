const { User } = require("../models");
const Events = require("./events");

module.exports = io => client => {
	client.on(Events.USER_LOGGED_IN, async data => {
		await User.findByIdAndUpdate(
			data,
			{ $set: { socketId: client.id } },
			{ new: true }
		);
		io.to(client.id).emit(Events.REFRESH_NOTIFICATIONS);
	});

	// client.on("SEND_NOTIFICATION", async data => {
	// 	console.log("Notification received...");
	// 	const student = await User.findById(data);
	// 	io.to(student.socketId).emit(Events.REFRESH_NOTIFICATIONS);
	// });
};
