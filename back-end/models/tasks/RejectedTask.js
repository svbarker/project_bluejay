const mongoose = require('mongoose');
const Task = require('./Task');

const RejectedTaskSchema = new mongoose.Schema(
	{},
	{
		timestamps: true,
		discriminatorKey: 'status'
	}
);

const RejectedTask = Task.discriminator('RejectedTask', RejectedTaskSchema);
module.exports = RejectedTask;
