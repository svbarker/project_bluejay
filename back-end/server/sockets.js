const { User } = require("../models");

module.exports = io => client => {
	client.on("login", data => {
		User.findByIdAndUpdate(
			data,
			{ $set: { socketId: client.id } },
			{ new: true }
		);
	});

	client.on("assign", async data => {
		const student = await User.findById(data);
		io.to(student.socketId).emit("notification");
	});
};
