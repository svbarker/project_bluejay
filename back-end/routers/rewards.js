const router = require("express").Router();
const {
	Reward,
	User,
	Teacher,
	Classroom,
	LootReward,
	PointReward
} = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const {
	ClassroomEvent,
	RewardEvent,
	Messages,
	ProfileEvent
} = require("../models/events");

// creating a reward
router.post("/", async (req, res) => {
	try {
		const { kind, description, title, cost, value, teacher, status } = req.body;
		if (!description) {
			throw new Error("No description supplied");
		}

		const rewardType = kind === "loot" ? LootReward : PointReward;
		const rewardObj = {
			description,
			title,
			teacher,
			status
		};
		if (kind === "loot") {
			rewardObj.cost = cost;
		} else {
			rewardObj.value = value;
		}

		const reward = new rewardType(rewardObj);
		const dbTeacher = await User.findById(teacher);
		dbTeacher.rewards.push(reward);
		await dbTeacher.save();
		await reward.save();

		// Create log events.
		logEvent(RewardEvent, {
			message: Messages.TEMPLATE_REWARD_CREATE,
			owner: req.user,
			reward
		});

		res.json(createResponse(reward));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

router.get("/rewardOptions", async (req, res) => {
	try {
		const user = req.user;

		let promises = user.classrooms.map(room =>
			Classroom.findById(room._id).populate({
				path: "teachers",
				model: "Teacher",
				populate: { path: "rewards", model: "Reward" }
			})
		);

		let classrooms = await Promise.all(promises);

		let rewards = classrooms.reduce(
			(rewards, room) =>
				room.teachers.reduce(
					(array, teacher) => array.concat(teacher.rewards),
					[]
				),
			[]
		);

		const reward = {
			rewardList: rewards.join(",")
		};

		logEvent(RewardEvent, {
			message: Messages.TEMPLATE_FETCH_ALL_REWARD_OPTIONS,
			owner: req.user,
			reward
		});

		res.json(createResponse(rewards));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a reward
router.get("/:id", async (req, res) => {
	try {
		const reward = await getResource(
			req.params.id,
			Reward.findById.bind(Reward)
		);

		// Create log event.
		logEvent(RewardEvent, {
			message: Messages.TEMPLATE_REWARD_READ,
			owner: req.user,
			reward
		});

		res.json(createResponse(reward));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// updating a reward
router.patch("/:id", async (req, res) => {
	try {
		const { updates } = req.body;

		const reward = await getResource(
			req.params.id,
			Reward.findByIdAndUpdate.bind(Reward),
			updates
		);
		if (updates.teacher) {
			let teacher = User.findById(updates.teacher);
			teacher.classrooms.push(classroom);
			await teacher.save();
		}

		// Create log event.
		reward.fields = Object.keys(updates).join(",");
		reward.values = Object.values(updates).join(",");
		logEvent(RewardEvent, {
			message: Messages.TEMPLATE_REWARD_UPDATE,
			owner: req.user,
			reward
		});

		res.json(createResponse(reward));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// deleting a reward
router.delete("/:id", async (req, res) => {
	try {
		const reward = await getResource(
			req.params.id,
			Reward.findByIdAndRemove.bind(Reward)
		);

		// Create log event.
		logEvent(RewardEvent, {
			message: Messages.TEMPLATE_REWARD_DELETE,
			owner: req.user,
			reward
		});

		res.json(createResponse(reward));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
