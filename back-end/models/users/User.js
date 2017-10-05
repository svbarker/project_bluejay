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
			path: 'classrooms',
			model: 'Classroom'
		},
		{
			path: 'tasks',
			model: 'Task'
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

const User = mongoose.model('User', UserSchema);
module.exports = User;
