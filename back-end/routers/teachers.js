const router = require('express').Router();
const {
	Teacher,
	Profile,
	Classroom,
	Task,
	AssignedTask,
	CompletedTask,
	RejectedTask,
	Reward
} = require('../models');
const { createResponse } = require('../server/util');
const { getResource, logEvent, logError } = require('../server/util');
const {
	UserEvent,
	ProfileEvent,
	TaskEvent,
	MessageEvent,
	Messages
} = require('../models/events');

// creating a teacher
router.post('/', async (req, res) => {
	try {
		const { email, password, title, about, fname, lname, gender } = req.body;
		if (!email || !password) {
			throw new Error('No email or password supplied');
		}
		const teacher = new Teacher({ email, password });
		const profileParams = {
			title,
			about,
			displayName: email.split('@')[0],
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
			owner: req.user
		});
		logEvent(ProfileEvent, {
			message: Messages.TEMPLATE_PROFILE_CREATE,
			owner: req.user,
			profile
		});

		await req.login(teacher, () => {});
		// Create log event.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_LOGGED_IN,
			owner: teacher
		});

		res.json(createResponse(teacher));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a teacher
router.get('/:id', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.id,
			Teacher.findById.bind(Teacher)
		);

		// Create log event.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_READ,
			owner: req.user,
			user: teacher
		});

		res.json(createResponse(teacher));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a teacher's task(s)
router.get('/:id/tasks', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.id,
			Teacher.findById.bind(Teacher),
			{},
			{
				path: 'tasks',
				model: 'Task'
			}
		);

		// Create log event.
		teacher.taskList = teacher.tasks.join(',');
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_TASK_READ,
			owner: req.user,
			user: teacher
		});

		res.json(createResponse(teacher.tasks));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// Assigning a task to a student
router.patch('/:te_id/student/:st_id/assign/:t_id', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.te_id,
			Teacher.findById.bind(Teacher)
		);

		let student = await teacher.getStudent(req.params.st_id);
		if (!student) {
			throw new Error(`That teacher doesn't have a student with that id`);
		}

		let task = await Task.findById(req.params.t_id);
		if (!task) {
			throw new Error(`No task found using that id.`);
		}

		// TODO: FIX THIS
		if (student.hasTask(task)) {
			throw new Error(`Student is already assigned that task.`);
		}

		// Create new assigned task from root task.
		let assignedTask = new AssignedTask(task.toNewObject());

		assignedTask.addStudent(student);
		assignedTask = await assignedTask.save();

		student.addTask(assignedTask);
		console.log(student);
		student = await student.save();
		console.log(student);
		// Create log events.
		logEvent(TaskEvent, {
			message: Messages.TEMPLATE_TASK_ASSIGN,
			owner: req.user,
			user: student,
			task: assignedTask
		});

		logEvent(MessageEvent, {
			body: Messages.TEMPLATE_TEACHER_TASK_ASSIGN_MSG,
			message: Messages.TEMPLATE_SEND_MESSAGE,
			owner: req.user,
			user: student,
			task: assignedTask
		});

		res.json(createResponse());
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// Confirming completion of a student's task
router.get('/:te_id/student/:st_id/complete/:t_id', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.te_id,
			Teacher.findById.bind(Teacher)
		);

		const student = teacher.getStudent(req.params.st_id);
		if (!student) {
			throw new Error(`That teacher doesn't have a student with that id`);
		}

		const task = student.getTask(req.params.t_id);
		if (!task) {
			throw new Error(`That student doesn't have a task with that id`);
		}

		// Create completed task.
		const completedTask = new CompletedTask(task.toNewObject());
		await completedTask.save();
		student.replaceTask(req.params.t_id, completedTask);

		// Create log events.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TASK_CONFIRM_COMPLETION,
			owner: req.user,
			user: student,
			task
		});

		logEvent(MessageEvent, {
			message: Messages.TEMPLATE_SEND_MESSAGE,
			owner: req.user,
			user: student,
			task,
			body: Messages.TEMPLATE_TEACHER_TASK_CONFIRM_COMPLETION_MSG
		});
	} catch (error) {
		logError(erro);
		res.json(createResponse(error));
	}
});

// Rejecting completion of a student's task
router.get('/:te_id/student/:st_id/reject/:t_id', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.te_id,
			Teacher.findById.bind(Teacher)
		);

		const student = teacher.getStudent(req.params.st_id);
		if (!student) {
			throw new Error(`That teacher doesn't have a student with that id`);
		}

		const task = student.getTask(req.params.t_id);
		if (!task) {
			throw new Error(`That student doesn't have a task with that id`);
		}
		// Create rejected task.
		const rejectedTask = new RejectedTask(task.toNewObject());
		student.replaceTask(req.params.t_id, rejectedTask);

		// Create log event.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TASK_REJECT_COMPLETION,
			owner: req.user,
			user: student,
			task
		});

		logEvent(MessageEvent, {
			message: Messages.TEMPLATE_SEND_MESSAGE,
			owner: req.user,
			user: student,
			task,
			body: Messages.TEMPLATE_TEACHER_TASK_REJECT_COMPLETION_MSG
		});

		res.json(createResponse());
	} catch (error) {
		logError(erro);
		res.json(createResponse(error));
	}
});
// Teacher: 59d52bfec574836cb7250eca
// Student: 59d52bfec574836cb7250ec8
// Task: 59d52bffc574836cb7250eec
// reading a teacher's reward(s)
router.get('/:id/rewards', async (req, res) => {
	console.log('id = ', req.params.id);
	try {
		const teacher = await getResource(
			req.params.id,
			Teacher.findById.bind(Teacher),
			{},
			{
				path: 'rewards',
				model: 'Reward'
			}
		);

		console.log('teacher = ', teacher);
		// Create log event.
		teacher.rewardList = teacher.rewards.join(',');
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_REWARD_READ,
			owner: req.user,
			user: teacher
		});

		res.json(createResponse(teacher.rewards));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a teacher's classroom(s)
router.get('/:id/classrooms', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.id,
			Teacher.findById.bind(Teacher),
			{},
			{
				path: 'classrooms',
				model: 'Classroom'
			}
		);

		// Create log event.
		teacher.classroomList = teacher.classrooms.join(',');
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_CLASSROOM_READ,
			owner: req.user,
			user: teacher
		});

		res.json(createResponse(teacher.classrooms));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a teacher's notifications(s)
router.get('/:id/notifications', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.id,
			Teacher.findById.bind(Teacher)
		);

		// Create log event.
		teacher.notificationList = teacher.notifications.join(',');
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_NOTIFICATION_READ,
			owner: req.user,
			user: teacher
		});

		res.json(createResponse(teacher.notifications));
	} catch (error) {
		res.json(createResponse(error));
	}
});

// updating a teacher
router.patch('/:id', async (req, res) => {
	try {
		const { updates } = req.body;
		const teacher = await getResource(
			req.params.id,
			Teacher.findByIdAndUpdate.bind(Teacher),
			updates
		);

		let promises = [];
		if (updates.classrooms) {
			updates.classrooms.forEach(classroom => {
				if (!classroom.teachers.includes(teacher._id)) {
					classroom = Classroom.findById(updates.classroom);
					classroom.teachers.push(teacher);
					promises.push(classroom.save());
				}
			});
		}
		if (updates.tasks) {
			updates.tasks.forEach(task => {
				if (!task.teachers.includes(teacher._id)) {
					task = Classroom.findById(updates.task);
					task.teachers.push(teacher);
					promises.push(task.save());
				}
			});
		}
		if (updates.rewards) {
			updates.rewards.forEach(reward => {
				if (!reward.teachers.includes(teacher._id)) {
					reward = Classroom.findById(updates.reward);
					reward.teachers.push(teacher);
					promises.push(reward.save());
				}
			});
		}

		// Create log event.
		teacher.fields = Object.keys(updates).join(',');
		teacher.values = Object.values(updates).join(',');

		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_UPDATE,
			owner: req.user,
			user: teacher
		});

		await Promise.all(promises);
		res.json(createResponse(teacher));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// deleting a teacher
router.delete('/:id', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.id,
			Teacher.findByIdAndRemove.bind(Teacher)
		);

		// Create log event.
		logEvent(UserEvent, {
			message: Messages.TEMPLATE_TEACHER_DELETE,
			owner: req.user,
			user: teacher
		});

		res.json(createResponse(teacher));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// deleting a teacher's notification
router.delete('/:t_id/notifications/:n_id', async (req, res) => {
	try {
		const teacher = await getResource(
			req.params.t_id,
			Teacher.findByIdAndRemove.bind(Teacher)
		);
		teacher.notifications = teacher.notifications.filter(
			notification => notification._id !== req.params.n_id
		);
		await teacher.save();
		res.json(createResponse(teacher.notifications));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
