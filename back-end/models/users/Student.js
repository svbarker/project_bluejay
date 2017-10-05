const mongoose = require('mongoose');
const User = require('./User');

const StudentSchema = new mongoose.Schema(
	{
		points: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

// StudentSchema.methods.hasTask = function(task) {
// 	return this.tasks.some(t => t.title === task.title);
// };

StudentSchema.methods.addTask = async function(task) {
	const index = this.tasks.findIndex(t => {
		return t.id === task.id;
	});
	if (index > -1) {
		this.tasks[index] = task;
	} else {
		this.tasks[this.tasks.length] = task;
	}
	await this.update({ tasks: this.tasks });
};

const Student = User.discriminator('Student', StudentSchema);
module.exports = Student;
