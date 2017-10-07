const router = require("express").Router();
const { createResponse } = require("../server/util");
const passport = require("passport");
const { getResource, logEvent, logError } = require("../server/util");
const { ErrorEvent, UserEvent, Messages } = require("../models/events");

// passport login route
router.post("/", async (req, res, next) => {
	console.log(router.socket);
	try {
		await passport.authenticate("local", async (err, user, info) => {
			try {
				if (!user) {
					throw new Error(
						`Invalid email or password. (email: ${req.body.username})`
					);
				}
				await req.logIn(user, err => {
					// Create log event.
					logEvent(UserEvent, {
						message: Messages.TEMPLATE_LOGGED_IN,
						owner: user,
						user
					});
				});
				res.json(createResponse(user));
			} catch (error) {
				logError(error);
				res.json(createResponse(err));
			}
		})(req, res, next);
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

router.delete("/", async (req, res, next) => {
	// Create log event.
	logEvent(UserEvent, {
		message: Messages.TEMPLATE_LOGGED_OUT,
		owner: req.user
	});

	try {
		await req.logout(() => {});
		res.cookie("connect.sid", "", { expires: new Date() });
		res.json(createResponse());
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
