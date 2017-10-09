const router = require("express").Router();
const { Reward, User, Teacher } = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const {
  ClassroomEvent,
  RewardEvent,
  Messages,
  ProfileEvent
} = require("../models/events");

// creating a reward
router.post("/", async (req, res) => {
  try {
    const { kind, description, cost, teacher, status } = req.body;
    if (!description) {
      throw new Error("No description supplied");
    }
    const reward = new Reward({ kind, description, cost, teacher, status });
    const dbTeacher = await User.findById(teacher);
    dbTeacher.rewards.push(reward);
    await dbTeacher.save();
    await reward.save();

    // Create log events.
    logEvent(RewardEvent, {
      message: Messages.TEMPLATE_REWARD_CREATE,
      owner: req.user,
      reward
    });

    res.json(createResponse(reward));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// reading a reward
router.get("/:id?", async (req, res) => {
  try {
    if (!req.params.id) {
      const teachers = Teacher.find().populate("rewards");

      const rewards = teachers.reduce(
        (rewards, teacher) => rewards.concat(teacher.rewards),
        []
      );

      const reward = {
        rewardList: rewards.join(","),
        rewards
      };

      logEvent(RewardEvent, {
        message: Messages.TEMPLATE_FETCH_ALL_REWARDS,
        owner: req.user,
        reward
      });

      res.json(createResponse(rewards));
    } else {
      const reward = await getResource(
        req.params.id,
        Reward.findById.bind(Reward)
      );

      // Create log event.
      logEvent(RewardEvent, {
        message: Messages.TEMPLATE_REWARD_READ,
        owner: req.user,
        reward
      });

      res.json(createResponse(reward));
    }
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// updating a reward
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
    console.log("body = ", req.body);
    const reward = await getResource(
      req.params.id,
      Reward.findByIdAndUpdate.bind(Reward),
      updates
    );
    if (updates.teacher) {
      let teacher = User.findById(updates.teacher);
      teacher.classrooms.push(classroom);
      await teacher.save();
    }

    // Create log event.
    reward.fields = Object.keys(updates).join(",");
    reward.values = Object.values(updates).join(",");
    logEvent(ProfileEvent, {
      message: Messages.TEMPLATE_REWARD_UPDATE,
      owner: req.user,
      reward
    });

    res.json(createResponse(reward));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// deleting a reward
router.delete("/:id", async (req, res) => {
  try {
    const reward = await getResource(
      req.params.id,
      Reward.findByIdAndRemove.bind(Reward)
    );

    // Create log event.
    logEvent(ClassroomEvent, {
      message: Messages.TEMPLATE_REWARD_DELETE,
      owner: req.user,
      reward
    });

    res.json(createResponse(reward));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
