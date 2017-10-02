const router = require("express").Router();
const { Classroom } = require("../models");
const { createResponse } = require("../server/util");

// creating a classroom
router.post("/", async (req, res) => {
  try {
    const { kind, description, cost, teacher, status } = req.body;
    const classroom = new Classroom({
      kind,
      description,
      cost,
      teacher,
      status
    });
    await classroom.save();
    res.json(createResponse(classroom));
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
students: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
],
teachers: [
  {
    type: mongoose.Schema.Types.ObjectId,


// reading a classroom
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const classroom = await Classroom.findById(_id);
    res.json(createResponse(classroom));
  } catch (error) {
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
    console.log(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
