const router = require("express").Router();

// add student to class
router.post("/classes/:classId/students", (req, res) => {});

router.get("/", (req, res) => {});

router.patch("/", (req, res) => {});

// remove student from class
router.delete("/classes/:classId/students/:studentId", (req, res) => {});

module.exports = router;
