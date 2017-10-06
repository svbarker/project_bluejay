const { User } = require("../models");

module.exports = io => client => {
	client.on("login", data => {
		User.findByIdAndUpdate(
			data,
			{ $set: { socketId: client.id } },
			{ new: true }
		);
	});

	client.on("SEND_NOTIFICATION", async data => {
		console.log("Notification received...");
		const student = await User.findById(data);
		io.to(student.socketId).emit("REFRESH_NOTIFICATIONS");
	});
};
