const Users = require("./users");
const Profile = require("./Profile");
const Classroom = require("./Classroom");
const Tasks = require("./tasks");
const Rewards = require("./rewards");
const Event = require("./events/index");

module.exports = {
	...Users,
	Profile,
	Classroom,
	...Tasks,
	...Rewards,
	...Event
};
