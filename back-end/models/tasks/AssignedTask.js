const mongoose = require("mongoose");
const Task = require("./Task");

const AssignedTaskSchema = new mongoose.Schema(
	{
		pending: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
		discriminatorKey: "status"
	}
);

const AssignedTask = Task.discriminator("AssignedTask", AssignedTaskSchema);
module.exports = AssignedTask;
