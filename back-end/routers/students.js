const router = require("express").Router();
const { Student, Profile } = require("../models");
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
      owner: teacher
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
      user: teacher
    });

    res.json(createResponse(student));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// updating a student
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
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

module.exports = router;
