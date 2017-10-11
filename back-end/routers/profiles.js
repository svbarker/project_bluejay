const router = require("express").Router();
const { Profile } = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const { ProfileEvent, Messages } = require("../models/events");

// reading a profile
router.get("/:id", async (req, res) => {
	try {
		const profile = await getResource(
			req.params.id,
			Profile.findById.bind(Profile)
		);

		// Create log event.
		logEvent(ProfileEvent, {
			message: Messages.TEMPLATE_PROFILE_READ,
			owner: req.user,
			profile
		});

		res.json(createResponse(profile));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// updating a profile
router.patch("/:id", async (req, res) => {
	try {
		const { updates } = req.body;
		const profile = await getResource(
			req.params.id,
			Profile.findByIdAndUpdate.bind(Profile),
			updates
		);

		// Create log event.
		profile.fields = Object.keys(updates).join(",");
		profile.values = Object.values(updates).join(",");
		logEvent(ProfileEvent, {
			message: Messages.TEMPLATE_PROFILE_UPDATE,
			owner: req.user,
			profile
		});

		res.json(createResponse(profile));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// deleting a profile
router.delete("/:id", async (req, res) => {
	try {
		const profile = await getResource(
			req.params.id,
			Profile.findByIdAndRemove.bind(Profile)
		);

		// Create log event.
		logEvent(ProfileEvent, {
			message: Messages.TEMPLATE_PROFILE_DELETE,
			owner: req.user,
			profile
		});

		res.json(createResponse(profile));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
