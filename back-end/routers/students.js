const router = require("express").Router();
const { Student, Profile, Classroom } = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const { UserEvent, ProfileEvent, Messages } = require("../models/events");

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
    const student = await getResource(
      req.params.id,
      Student.findById.bind(Student)
    );

    // Create log event.
    logEvent(UserEvent, {
      message: Messages.TEMPLATE_STUDENT_READ,
      owner: req.user,
      user: student
    });

    res.json(createResponse(student));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// reading a student's task(s)
router.get("/:id/tasks", async (req, res) => {
  try {
    const student = await getResource(
      req.params.id,
      Student.findById.bind(Student),
      {},
      {
        path: "tasks",
        model: "Task"
      }
    );

    // Create log event.
    student.taskList = student.tasks.join(",");
    logEvent(UserEvent, {
      message: Messages.TEMPLATE_STUDENT_TASK_READ,
      owner: req.user,
      user: student
    });

    res.json(createResponse(student.tasks));
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
      Student.findById.bind(Student),
      {},
      {
        path: "rewards",
        model: "Reward"
      }
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
    student.notificationList = student.notifications.join(",");
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
    console.log("updates = ", updates);
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
