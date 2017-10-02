const router = require("express").Router();
const { Task } = require("../models");
const { createResponse } = require("../server/util");

// creating a task
router.post("/", async (req, res) => {
  try {
    const { title, description, rewards, teacher, class, status } = req.body;
    const task = new Task({ title, description, rewards, teacher, class, status });
    await task.save();
    res.json(createResponse(task));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

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
