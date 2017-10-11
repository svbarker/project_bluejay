const router = require("express").Router();
const {
	Student,
	Profile,
	Classroom,
	Teacher,
	Reward,
	LootReward
} = require("../models");
const { createResponse, refreshNotsClientSide } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const {
	UserEvent,
	TaskEvent,
	ProfileEvent,
	Messages,
	MessageEvent,
	RewardEvent
} = require("../models/events");

// creating a student
router.post("/", async (req, res) => {
	try {
		const { email, fname, lname, gender } = req.body;
		if (!email) {
			throw new Error("No email supplied");
		}
		const student = new Student({ email, password });
		const profileParams = {
			displayName: email.split("@")[0],
			avatar: null,
			gender,
			fname,
			lname
		};
		const profile = new Profile(profileParams);
		student.profile = profile;
		await student.save();
		await profile.save();

		// Create log events.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_CREATE,
			owner: req.user
		});
		logEvent(ProfileEvent, {
			message: Messages.TEMPLATE_PROFILE_CREATE,
			owner: req.user,
			profile
		});

		await req.login(student, () => {});
		// Create log event.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_LOGGED_IN,
			owner: student
		});

		res.json(createResponse(student));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a student
router.get("/:id", async (req, res) => {
	try {
		const user = await getResource(
			req.params.id,
			Student.findById.bind(Student)
		);

		// Create log event.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_READ,
			owner: req.user,
			user
		});

		res.json(createResponse(user));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a student's task(s)
router.get("/:id/tasks", async (req, res) => {
	try {
		const user = await getResource(
			req.params.id,
			Student.findById.bind(Student)
		);

		// Create log event.
		user.taskList = user.tasks.join(",");
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_TASK_READ,
			owner: req.user,
			user
		});

		res.json(createResponse(user.tasks));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// completing a student's task(s)
router.patch("/:id/complete/:t_id", async (req, res) => {
	try {
		const student = await getResource(
			req.params.id,
			Student.findById.bind(Student)
		);

		if (!student) {
			throw new Error(`No student found with that id`);
		}

		const task = await student.getTask(req.params.t_id);
		if (!task) {
			throw new Error(`That student doesn't have a task with that id`);
		}

		// Update the task's pending flag
		task.pending = true;
		await task.save();

		const user = await getResource(
			task.teacher,
			Teacher.findById.bind(Teacher)
		);

		// Create log events
		logEvent(TaskEvent, {
			message: Messages.TEMPLATE_TASK_REQUEST_COMPLETION,
			owner: req.user,
			task
		});

		const event = await logEvent(MessageEvent, {
			body: Messages.TEMPLATE_STUDENT_REQUEST_COMPLETION_MSG,
			message: Messages.TEMPLATE_SEND_MESSAGE,
			owner: req.user,
			user,
			task
		});
		await user.addNotifications(event);

		refreshNotsClientSide(req, user);

		res.json(createResponse(task));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a student's reward(s)
router.get("/:id/rewards", async (req, res) => {
	try {
		const student = await getResource(
			req.params.id,
			Student.findById.bind(Student)
		);

		// Create log event.
		student.rewardList = student.rewards.join(",");
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_REWARD_READ,
			owner: req.user,
			user: student
		});

		res.json(createResponse(student.rewards));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

router.get("/student/points", async (req, res) => {
	try {
		const student = req.user;
		res.json(createResponse(student.points));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// purchase a reward
router.patch("/:s_id/purchase/:r_id", async (req, res) => {
	try {
		const student = await getResource(
			req.params.s_id,
			Student.findById.bind(Student)
		);
		const reward = await getResource(
			req.params.r_id,
			Reward.findById.bind(Reward)
		);
		if (student.points < reward.cost) {
			throw new Error("You do not have enough points to purchase this.");
		}
		student.points -= reward.cost;

		const newReward = new LootReward(reward.toNewObject());
		await newReward.save();
		await student.addReward(newReward);

		logEvent(RewardEvent, {
			message: Messages.TEMPLATE_REWARD_PURCHASE,
			owner: req.user,
			user: req.user,
			reward
		});

		const event = await logEvent(MessageEvent, {
			body: Messages.TEMPLATE_STUDENT_REWARD_PURCHASE_MSG,
			message: Messages.TEMPLATE_SEND_MESSAGE,
			owner: req.user,
			user: req.user,
			reward
		});
		student.addNotifications(event);

		refreshNotsClientSide(req, student);

		res.json(createResponse());
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// redeeming (NOT PURCHASING)
router.patch("/:s_id/redeem/:r_id", async (req, res) => {
	try {
		// get student
		const student = await getResource(
			req.params.s_id,
			Student.findById.bind(Student)
		);

		// get reward
		const reward = student.getReward(req.params.r_id);
		if (!reward) {
			throw new Error(`You don't have that reward`);
		}

		const teacher = await getResource(
			reward.teacher,
			Teacher.findById.bind(Teacher)
		);
		if (!teacher) {
			throw new Error(`This reward does not have a teacher!`);
		}

		// set reward status to "pending"
		reward.status = "Pending";
		await reward.save();

		// create log events
		logEvent(RewardEvent, {
			message: Messages.TEMPLATE_REWARD_REDEEM,
			owner: req.user,
			user: student,
			reward
		});

		const event = await logEvent(MessageEvent, {
			body: Messages.TEMPLATE_STUDENT_REWARD_REDEEM_MSG,
			message: Messages.TEMPLATE_SEND_MESSAGE,
			owner: req.user,
			user: student,
			reward
		});

		const teacherEvent = await logEvent(MessageEvent, {
			body: Messages.TEMPLATE_REWARD_REDEEM,
			message: Messages.TEMPLATE_SEND_MESSAGE,
			owner: req.user,
			user: teacher,
			reward
		});
		teacher.addNotifications(teacherEvent);
		student.addNotifications(event);

		refreshNotsClientSide(req, teacher);
		refreshNotsClientSide(req, student);

		res.json(createResponse(reward));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a student's classroom(s)
router.get("/:id/classrooms", async (req, res) => {
	try {
		const student = await getResource(
			req.params.id,
			Student.findById.bind(Student),
			{},
			{
				path: "classrooms",
				model: "Classroom"
			}
		);

		// Create log event.
		student.classroomList = student.classrooms.join(",");
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_CLASSROOM_READ,
			owner: req.user,
			user: student
		});

		res.json(createResponse(student.classrooms));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a student's notifications(s)
router.get("/:id/notifications", async (req, res) => {
	try {
		const student = await getResource(
			req.params.id,
			Student.findById.bind(Student)
		);

		// Create log event.
		student.notificationList =
			student.notifications.map(el => el._body).join(",") || "None found";
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_NOTIFICATION_READ,
			owner: req.user,
			user: student
		});

		res.json(createResponse(student.notifications));
	} catch (error) {
		res.json(createResponse(error));
	}
});

// updating a student
router.patch("/:id", async (req, res) => {
	try {
		const { updates } = req.body;
		const student = await getResource(
			req.params.id,
			Student.findByIdAndUpdate.bind(Student),
			updates
		);

		let promises = [];
		if (updates.classrooms) {
			updates.classrooms.forEach(classroom => {
				if (!classroom.students.includes(student._id)) {
					classroom = Classroom.findById(updates.classroom);
					classroom.students.push(student);
					promises.push(classroom.save());
				}
			});
		}

		// Create log event.
		student.fields = Object.keys(updates).join(",");
		student.values = Object.values(updates).join(",");
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_UPDATE,
			owner: req.user,
			user: student
		});

		await Promise.all(promises);
		res.json(createResponse(student));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// deleting a student
router.delete("/:id", async (req, res) => {
	try {
		const student = await getResource(
			req.params.id,
			Student.findByIdAndRemove.bind(Student)
		);

		// Create log event.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_STUDENT_DELETE,
			owner: req.user,
			user: student
		});

		res.json(createResponse(student));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// deleting a student's notification
router.delete("/:s_id/notifications/:n_id", async (req, res) => {
	try {
		const student = await getResource(
			req.params.s_id,
			Student.findByIdAndRemove.bind(Student)
		);
		student.notifications = student.notifications.filter(
			notification => notification._id !== req.params.n_id
		);
		await student.save();
		res.json(createResponse(student.notifications));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
