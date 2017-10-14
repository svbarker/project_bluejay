const mongoose = require('mongoose');
const Task = require('./Task');

const CompletedTaskSchema = new mongoose.Schema(
	{},
	{
		timestamps: true,
		discriminatorKey: 'status'
	}
);

const CompletedTask = Task.discriminator('CompletedTask', CompletedTaskSchema);
module.exports = CompletedTask;
