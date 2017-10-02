const router = require("express").Router();
const { Student, Profile } = require("../models");
const { createResponse } = require("../server/util");

// creating a student
router.post("/", async (req, res) => {
  try {
    const { email, fname, lname, gender } = req.body;
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
    await req.login(student, () => {});
    res.json(createResponse(student));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// reading a student
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await Student.findById(_id);
    res.json(createResponse(student));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// updating a student
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
    const _id = req.params.id;
    const student = await Student.findByIdAndUpdate(_id, updates);
    res.json(createResponse(student));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// deleting a student
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await Student.findByIdAndRemove(_id);
    res.json(createResponse(student));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
