const router = require("express").Router();
const { Teacher, Profile } = require("../models");
const { createResponse } = require("../server/util");

// creating a teacher
router.post("/", async (req, res) => {
  try {
    const { email, password, title, about, fname, lname, gender } = req.body;
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
    await req.login(teacher, () => {});
    res.json(createResponse(teacher));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// reading a teacher
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.findById(_id);
    res.json(createResponse(teacher));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// reading a teacher's task(s)
router.get("/:id/tasks", async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.findById(_id).populate({
      path: "tasks",
      model: "Task"
    });
    res.json(createResponse(teacher.tasks));
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    const _id = req.params.id;
    const teacher = await Teacher.findByIdAndUpdate(_id, updates);
    res.json(createResponse(teacher));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// deleting a teacher
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.findByIdAndRemove(_id);
    res.json(createResponse(teacher));
  } catch (error) {
    console.error(error);
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
