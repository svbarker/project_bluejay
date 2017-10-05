const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		passwordHash: String,
		profile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile'
		},
		classrooms: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Classroom'
			}
		],
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task'
			}
		],
		rewards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Reward'
			}
		],
		notifications: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Event'
			}
		]
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

const autoPopulate = function(next) {
	this.populate([
		{
			path: 'profile',
			model: 'Profile'
		},
		{
			path: 'notifications',
			model: 'Event'
		}
	]);
	next();
};

UserSchema.pre('findOne', autoPopulate);
UserSchema.pre('findOneAndUpdate', autoPopulate);
UserSchema.pre('findOneAndRemove', autoPopulate);

UserSchema.virtual('fullname').get(function() {
	return this.profile.fullname;
});

UserSchema.virtual('password').set(function(val) {
	this.passwordHash = bcrypt.hashSync(val, 10);
});

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.toString = function() {
	return this.fullname;
};

UserSchema.methods.getClassroom = function(id) {
	return this.classrooms.find(c => {
		return c.id === id;
	});
};

UserSchema.methods.hasTask = function(task) {
	return this.tasks.some(t => {
		return t.title === task.title;
	});
};

UserSchema.methods.getTask = function(id) {
	return this.tasks.find(t => t.id === id);
};

UserSchema.methods.getTaskByTitle = function(task) {
	return this.tasks.find(t => t.title === task.title);
};

UserSchema.methods.getReward = function(id) {
	return this.rewards.find(r => r.id === id);
};

UserSchema.methods.getRewardByTitle = function(reward) {
	return this.rewards.find(r => r.title === reward.title);
};

UserSchema.methods.addTask = async function(task) {
	const index = this.tasks.findIndex(t => {
		return t.id === task.id;
	});
	if (index > -1) {
		this.tasks[index] = task;
	} else {
		this.tasks[this.tasks.length] = task;
	}
	await this.update({ tasks: this.tasks });
	return task;
};

UserSchema.methods.removeTask = async function(task) {
	const index = this.tasks.findIndex(t => {
		return t.id === task.id;
	});

	if (index > -1) {
		this.tasks.splice(index, 1);
		await this.update({ tasks: this.tasks });
	}
	return task;
};

UserSchema.methods.addReward = async function(reward) {
	this.rewards.push(reward);
	await this.update({ rewards: this.rewards });
	return reward;
};

UserSchema.methods.removeReward = async function(reward) {
	const index = this.rewards.findIndex(t => {
		return t.id === reward.id;
	});

	if (index > -1) {
		this.rewards.splice(index, 1);
		await this.update({ rewards: this.rewards });
	}
	return reward;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
