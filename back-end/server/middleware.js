const mongoose = require("mongoose");
const { createResponse } = require("./util");

module.exports = {
  mongooseConnect: (res, req, next) => {
    if (!mongoose.connection.readyState) {
      require("../mongoose/connect")();
    }
    next();
  },
  authCheck: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.send(createResponse(new Error("User could not be authenticated")));
    }
  }
	logger: ({ url, method }, res, next) => {
		const resource = url.match(/^\/api\/(\w+)s\//i);
		if (!resource) next();
		const event = createEvent(resource, method);
		console.log(event);
		next();
	}
};

function createEvent(resource, method) {
	switch (resource) {
		case 'session':
			switch (method) {
				default: // GET SINGLE TEACHER
			}
			break;
	}
}
