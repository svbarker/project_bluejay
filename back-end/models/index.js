const Users = require('./users/index');
const Profile = require('./Profile');
const Classroom = require('./Classroom');
const Task = require('./Task');
const Rewards = require('./rewards/index');
const Event = require('./events/index');

module.exports = {
	...Users,
	Profile,
	Classroom,
	Task,
	...Rewards,
	...Event
};
