const router = require("express").Router();
const { Classroom } = require("../models");
const { createResponse } = require("../server/util");

// creating a classroom
router.post("/", async (req, res) => {
  try {
    const { title, description, students, teachers } = req.body;
    const classroom = new Classroom({ title, description, students, teachers });
    await classroom.save();
    res.json(createResponse(classroom));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// reading a classroom
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const classroom = await Classroom.findById(_id);
    res.json(createResponse(classroom));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// updating a classroom
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
    const _id = req.params.id;
    const classroom = await Classroom.findByIdAndUpdate(_id, updates);
    res.json(createResponse(classroom));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// deleting a classroom
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const classroom = await Classroom.findByIdAndRemove(_id);
    res.json(createResponse(classroom));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
