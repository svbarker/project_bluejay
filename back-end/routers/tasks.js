const router = require("express").Router();
const { Task, User, Student } = require("../models");
const { createResponse } = require("../server/util");
const {
  getResource,
  logEvent,
  logError,
  refreshNotsClientSide
} = require("../server/util");
const { TaskEvent, MessageEvent, Messages } = require("../models/events");

// creating a task
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      rewards,
      teacher,
      classroom,
      status
    } = req.body;
    if (!title || !description) {
      throw new Error("No title or description supplied.");
    }
    const task = new Task({
      title,
      description,
      rewards,
      teacher,
      classroom,
      status
    });
    let promises = [];
    let teacherObj = await User.findById(teacher);
    teacherObj.tasks.push(task);
    promises.push(teacherObj.save());
    promises.push(task.save());

    // Create log event.
    logEvent(
      TaskEvent,
      {
        message: Messages.TEMPLATE_TASK_CREATE,
        owner: req.user,
        task
      },
      false
    );

    await Promise.all(promises);
    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// reading a task
router.get("/:id", async (req, res) => {
  try {
    const task = await getResource(req.params.id, Task.findById.bind(Task));

    // Create log event.
    logEvent(TaskEvent, {
      message: Messages.TEMPLATE_TASK_READ,
      owner: req.user,
      task
    });

    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// reading a task's students
router.get("/:id/students", async (req, res) => {
  try {
    const task = await getResource(req.params.id, Task.findById.bind(Task));

    // Create log event.
    task.studentList = task.students.join(",");
    logEvent(TaskEvent, {
      message: Messages.TEMPLATE_TASK_STUDENT_READ,
      owner: req.user,
      task
    });

    res.json(createResponse(task.students));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// updating a task
router.patch("/:id", async (req, res) => {
  try {
    let { updates, message } = req.body;
    if (!updates) {
      updates = req.session.body.updates;
      delete req.session.body;
    }
    const task = await getResource(
      req.params.id,
      Task.findByIdAndUpdate.bind(Task),
      updates
    );

    if (updates.teacher) {
      let teacher = User.findById(updates.teacher);
      teacher.tasks.push(task);
      await teacher.save();
    }

    task.fields = Object.keys(updates).join(",");
    task.values = Object.values(updates).join(",");
    logEvent(TaskEvent, {
      message: Messages.TEMPLATE_TASK_UPDATE,
      owner: req.user,
      task
    });
    if (updates.statues && updates.statues === "complete" && message) {
      logEvent(
        MessageEvent,
        {
          message: Messages.TEMPLATE_SEND_MESSAGE,
          owner: req.user,
          user: task.teacher,
          body: message,
          task
        },
        false
      );
    }
    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// Unassign task from student
router.patch("/:id/unassign/:s_id", async (req, res) => {
  try {
    const task = await getResource(req.params.id, Task.findById.bind(Task));

    const student = await getResource(
      req.params.s_id,
      Student.findById.bind(Student)
    );

    await task.removeStudent(student);
    await task.save();

    await student.removeTask(task);

    logEvent(TaskEvent, {
      message: Messages.TEMPLATE_TASK_UNASSIGN,
      owner: req.user,
      user: student,
      task
    });

    const event = await logEvent(MessageEvent, {
      body: Messages.TEMPLATE_TEACHER_TASK_UNASSIGN_MSG,
      message: Messages.TEMPLATE_SEND_MESSAGE,
      owner: req.user,
      user: student,
      task: assignedTask
    });

    refreshNotsClientSide(req, student);

    res.json(createResponse(student.id));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// Bulk-unassign from class
router.patch("/:id/bulkunassign", async (req, res) => {
  try {
    const { studentIds } = req.body;
    const task = await getResource(req.params.id, Task.findById.bind(Task));

    studentIds.forEach(async id => {
      const student = await getResource(id, Student.findById.bind(Student));

      task.removeStudent(student);
      student.removeTask(task);
      await task.save();

      logEvent(TaskEvent, {
        message: Messages.TEMPLATE_TASK_UNASSIGN,
        owner: req.user,
        user: student,
        task
      });

      const event = await logEvent(MessageEvent, {
        body: Messages.TEMPLATE_TEACHER_TASK_UNASSIGN_MSG,
        message: Messages.TEMPLATE_SEND_MESSAGE,
        owner: req.user,
        user: student,
        task: assignedTask
      });

      refreshNotsClientSide(req, student);
    });

    res.json(createResponse(studentIds));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await getResource(req.params.id, Task.findByIdAndRemove(Task));
    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
