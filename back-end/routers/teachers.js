const router = require("express").Router();
const { Teacher, Profile, Classroom, Task, Reward } = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const { UserEvent, ProfileEvent, Messages } = require("../models/events");

// creating a teacher
router.post("/", async (req, res) => {
  try {
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
router.get("/:id", async (req, res) => {
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
router.get("/:id/tasks", async (req, res) => {
  try {
    const teacher = await getResource(
      req.params.id,
      Teacher.findById.bind(Teacher),
      {},
      {
        path: "tasks",
        model: "Task"
      }
    );

    // Create log event.
    logEvent(UserEvent, {
      message: Messages.TEMPLATE_TEACHER_READ,
      owner: req.user,
      user: teacher
    });

    res.json(createResponse(teacher.tasks));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// reading a teacher's reward(s)
router.get("/:id/rewards", async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.findById(_id).populate({
      path: "rewards",
      model: "Reward"
    });
    res.json(createResponse(teacher.rewards));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// reading a teacher's classroom(s)
router.get("/:id/classrooms", async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.findById(_id).populate({
      path: "classrooms",
      model: "Classroom"
    });
    res.json(createResponse(teacher.classrooms));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// reading a teacher's notifications(s)
router.get("/:id/notifications", async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.findById(_id);
    res.json(createResponse(teacher.notifications));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// updating a teacher
router.patch("/:id", async (req, res) => {
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
    teacher.fields = Object.keys(updates).join(",");
    teacher.values = Object.values(updates).join(",");

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
router.delete("/:id", async (req, res) => {
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
router.delete("/:t_id/notifications/:n_id", async (req, res) => {
  try {
    const t_id = req.params.t_id;
    const n_id = req.params.n_id;
    const teacher = await Teacher.findById(t_id);
    teacher.notifications = teacher.notifications.filter(
      notification => notification._id !== n_id
    );
    await teacher.save();
    res.json(createResponse(teacher.notifications));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
