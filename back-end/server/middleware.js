const mongoose = require('mongoose');
const { createResponse } = require('./util');

const {
	UserEvent,
	ProfileEvent,
	ClassEvent,
	TaskEvent,
	RewardEvent
} = require('../models/events');

module.exports = {
	mongooseConnect: (res, req, next) => {
		if (!mongoose.connection.readyState) {
			require('../mongoose/connect')();
		}
		next();
	},
	authCheck: (req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.send(createResponse(new Error('User could not be authenticated')));
		}
	},
	logger: (req, res, next) => {
		const { originalUrl, method } = req;
		console.log(req.session);
		const resource = originalUrl.match(/^\/(?:api\/)?(\w+)s/i);
		console.log(resource);
		if (!resource[1]) next();
		const event = createEvent.call(req, resource[1], method);
		console.log(event);
		next(req);
	}
};

const TEMPLATE_LOGGED_IN = `%owner.displayName% logged in.`;
const TEMPLATE_LOGGED_OUT = `%owner.displayName% logged out.`;
const TEMPLATE_REGISTER = resource =>
	`A new ${resource} was registered with %owner.email%, %owner.fname%, %owner.lname%.`;
function createEvent(resource, method) {
	switch (resource) {
		case 'session':
			switch (method) {
				case 'POST': // Logging in
					return new UserEvent({
						internal: true,
						message: TEMPLATE_LOGGED_IN,
						owner: this.session.user
					});
				case 'DELETE': // Logging out
					return new UserEvent({
						internal: true,
						message: TEMPLATE_LOGGED_OUT,
						owner: this.session.user
					});
			}
			break;
		case 'teacher':
		case 'student':
			switch (method) {
				case 'POST': // Registering a teacher.
					return new UserEvent({
						internal: true,
						message: TEMPLATE_REGISTER(resource),
						owner: this.session.user
					});
					break;
				case 'GET':
					if (!this.params.id) {
						return new UserEvent({
							internal: true,
							message: `Attempted to log data retrieval initiated by %owner.displayName%, but failed, could not find resource.`
						});
					}
					const user = User.findById(this.params.id);
					if (!user) {
						return new UserEvent({
							internal: true,
							message: `Attempted to log data retrieval initiated by %owner.displayName%, but failed, could not find resource.`
						});
					}
					return new UserEvent({
						internal: true,
						message: `Data was fetched for ${resource} %owner.displayName% by %user.displayName%`,
						owner: this.session.user,
						user
					});
				case 'PATCH':
					break;
			}
			break;
	}
}
