const router = require("express").Router();
const { createResponse } = require("../server/util");
const { Teacher, Profile } = require("../models");
const { Messages } = require("../models/events");
const { logEvent, logError } = require("../server/util");
const { UserEvent, ProfileEvent } = require("../models/events");

// creating a teacher
router.post("/", async (req, res) => {
	try {
		console.log("Body: ", req.body);
		const { email, password, title, about, fname, lname, gender } = req.body;
		if (!email || !password) {
			throw new Error("No email or password supplied");
		}
		const teacher = new Teacher({ email, password });
		const profileParams = {
			title,
			about,
			displayName: email.split("@")[0],
			avatar: null,
			gender,
			fname,
			lname
		};
		const profile = new Profile(profileParams);
		teacher.profile = profile;
		await teacher.save();
		await profile.save();

		// Create log events.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_CREATE,
			owner: req.user,
			user: req.user
		});
		logEvent(ProfileEvent, {
			message: Messages.TEMPLATE_PROFILE_CREATE,
			owner: req.user,
			profile
		});

		await req.login(teacher, () => {});
		// Create log event.
		logEvent(UserEvent, 
			message: Messages.TEMPLATE_LOGGED_IN,
			owner: teacher
			user: req.user
		});

		res.json(createResponse(teacher));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
