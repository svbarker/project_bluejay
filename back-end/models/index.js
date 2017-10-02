const User = require('./User');
const Student = require('./Student');
const Teacher = require('./Teacher');
const Profile = require('./Profile');
const Class = require('./Class');
const Task = require('./Task');
const Reward = require('./Reward');
const Event = require('./events/index');

module.exports = {
	User,
	Student,
	Teacher,
	Profile,
	Class,
	Task,
	Reward,
	...Event
};
