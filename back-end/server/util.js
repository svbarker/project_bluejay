const { ErrorEvent, Messages } = require("../models/events");
module.exports = {
	getResource: async function(_id, method, options, populate) {
		if (!_id) {
			throw new Error("No id supplied for resource method.");
		}
		let resource;
		if (populate) {
			resource = await method(_id, options).populate(populate);
		} else {
			console.log("Id: ", _id);
			resource = await method(_id, options);
		}
		if (!resource) {
			throw new Error("No resource found with that id.");
		}
		return resource;
	},

	createResponse: data => {
		const isError = data instanceof Error;
		const response = {
			success: isError ? false : true
		};
		if (isError) {
			response.apiError = {
				message: data.message,
				stack: data.stack
			};
		} else {
			response.apiData = data;
		}
		return response;
	},
	log: async event => {
		console.log("The event!!!", event);
		event = await event.save();
		console.log(`[${event.createdAt}]: ${event}`);
	},
	logEvent: (type, options, internal = true) => {
		const newEvent = new type(
			Object.assign(
				{
					internal
				},
				options
			)
		);
		module.exports.log(newEvent);
		return newEvent;
	},
	logError: error => {
		const newEvent = new ErrorEvent({
			message: Messages.INTERNAL_ERROR,
			error
		});
		module.exports.log(newEvent);
		return newEvent;
	}
};
