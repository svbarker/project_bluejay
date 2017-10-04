const mongoose = require('mongoose');
const Task = require('./Task');

const AssignedTaskSchema = new mongoose.Schema(
	{},
	{
		timestamps: true,
		discriminatorKey: 'status'
	}
);

const AssignedTask = Task.discriminator('AssignedTask', AssignedTaskSchema);
module.exports = AssignedTask;
