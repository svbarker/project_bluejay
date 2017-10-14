const router = require("express").Router();
const { Classroom, User, Student, Profile } = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const {
	ClassroomEvent,
	UserEvent,
	ProfileEvent,
	Messages
} = require("../models/events");

// creating a classroom
router.post("/", async (req, res) => {
	try {
		const { title, description, students, teachers } = req.body;
		if (!title || !description) {
			throw new Error("No title or description supplied.");
		}
		const classroom = new Classroom({ title, description, students, teachers });
		let promises = [];
		teachers.forEach(async teacher => {
			teacher = await User.findById(teacher);
			teacher.classrooms.push(classroom);
			promises.push(teacher.save());
		});

		students.forEach(student => {
			student = User.findById(student);
			student.classrooms.push(classroom);
			promises.push(student.save());
		});

		promises.push(classroom.save());
		// Create log event.
		logEvent(
			ClassroomEvent,
			{
				message: Messages.TEMPLATE_CLASSROOM_CREATE,
				owner: req.user,
				classroom: classroom
			},
			false
		);

		await Promise.all(promises);
		res.json(createResponse(classroom));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a classroom
router.get("/:id", async (req, res) => {
	try {
		const classroom = await getResource(
			req.params.id,
			Classroom.findById.bind(Classroom)
		);

		// Create log event.
		logEvent(ClassroomEvent, {
			message: Messages.TEMPLATE_CLASSROOM_READ,
			owner: req.user,
			classroom: classroom
		});

		res.json(createResponse(classroom));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a classroom's students
router.get("/:id/students", async (req, res) => {
	try {
		const classroom = await getResource(
			req.params.id,
			Classroom.findById.bind(Classroom)
		);

		// Create log event.
		classroom.studentList = classroom.students.join(",");
		logEvent(ClassroomEvent, {
			message: Messages.TEMPLATE_CLASSROOM_STUDENT_READ,
			owner: req.user,
			classroom
		});

		res.json(createResponse(classroom.students));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// reading a classroom's teachers
router.get("/:id/teachers", async (req, res) => {
	try {
		const classroom = await getResource(
			req.params.id,
			Classroom.findById.bind(Classroom)
		);

		// Create log event.
		classroom.teacherList = classroom.teachers.join(",");
		logEvent(ClassroomEvent, {
			message: Messages.TEMPLATE_CLASSROOM_TEACHER_READ,
			owner: req.user,
			classroom
		});

		res.json(createResponse(classroom.teachers));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// updating a classroom
router.patch("/:id", async (req, res) => {
	try {
		const { updates } = req.body;
		const classroom = await getResource(
			req.params.id,
			Classroom.findByIdAndUpdate.bind(Classroom),
			updates
		);

		let promises = [];
		if (updates.teachers) {
			updates.teachers.forEach(teacher => {
				teacher = User.findById(teacher);
				teacher.classrooms.push(classroom);
				promises.push(teacher.save());
			});
		}
		if (updates.students) {
			students.forEach(student => {
				student = User.findById(student);
				student.classrooms.push(classroom);
				promises.push(student.save());
			});
		}

		// Create log event.
		classroom.fields = Object.keys(updates).join(",");
		classroom.values = Object.values(updates).join(",");
		logEvent(ClassroomEvent, {
			message: Messages.TEMPLATE_CLASSROOM_UPDATE,
			owner: req.user,
			classroom: classroom
		});

		await Promise.all(promises);
		res.json(createResponse(classroom));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

// deleting a classroom
router.delete("/:id", async (req, res) => {
	try {
		const classroom = await getResource(
			req.params.id,
			Classroom.findByIdAndRemove.bind(Classroom)
		);

		// Create log event.
		logEvent(ClassroomEvent, {
			message: Messages.TEMPLATE_CLASSROOM_DELETE,
			owner: req.user,
			classroom: classroom
		});

		res.json(createResponse(classroom));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

//Creating a student and adding them to a classroom
router.post("/:cl_id/student", async (req, res) => {
	try {
		const classroom = await getResource(
			req.params.cl_id,
			Classroom.findById.bind(Classroom)
		);

		const { email, fname, lname, password } = req.body;
		if (!email) {
			throw new Error("No email supplied");
		}

		let student = await User.findOne({ email });
		if (!student) {
			student = new Student({
				email,
				password,
				classrooms: []
			});
			const profileParams = {
				displayName: `${fname} ${lname}`,
				avatar: null,
				fname,
				lname
			};
			const profile = new Profile(profileParams);
			student.profile = profile;
			await student.save();
			await profile.save();

			logEvent(UserEvent, {
				message: Messages.TEMPLATE_STUDENT_CREATE,
				owner: req.user,
				user: req.user
			});
			logEvent(ProfileEvent, {
				message: Messages.TEMPLATE_PROFILE_CREATE,
				owner: req.user,
				profile
			});
		}

		student.classrooms.push(classroom);
		classroom.students.push(student);
		await student.save();
		await classroom.save();

		res.json(createResponse(classroom));
	} catch (error) {
		logError(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
