const router = require("express").Router();
const { Task } = require("../models");
const { createResponse } = require("../server/util");

// creating a task
router.post("/", async (req, res) => {
  try {
    const { title, description, rewards, teacher, class, status } = req.body;
    const task = new Task({ title, description, rewards, teacher, class, status });
    const profileParams = {
      title,
      displayName: email.split("@")[0],
      avatar: null,
      gender,
      fname,
      lname
    };
    const profile = new Profile(profileParams);
    task.profile = profile;
    await task.save();
    await profile.save();
    await req.login(task, () => {});
    res.json(createResponse(task));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

title: {
  type: String,
  required: true,
  unique: true
},
description: {
  type: String,
  required: true
},
rewards: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  }
],
teacher: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Teacher'
},
class: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Class'
},
status: {
  type: String,
  default: 'Unassigned'
}
},


// reading a task
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    res.json(createResponse(task));
  } catch (error) {
    res.json(createResponse(error));
  }
});

// updating a task
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
    const _id = req.params.id;
    const task = await Task.findByIdAndUpdate(_id, updates);
    res.json(createResponse(task));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// deleting a task
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndRemove(_id);
    res.json(createResponse(task));
  } catch (error) {
    console.log(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
