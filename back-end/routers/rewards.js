const router = require("express").Router();
const { Reward, User } = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require("../server/util");
const { RewardEvent, Messages } = require("../models/events");

// creating a reward
router.post("/", async (req, res) => {
  try {
    const { kind, description, cost, teacher, status } = req.body;
    if (!description) {
      throw new Error("No description supplied");
    }
    const reward = new Reward({ kind, description, cost, teacher, status });
    const teacher = await User.findById(teacher);
    teacher.rewards.push(reward);
    await teacher.save();
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
router.get("/:id", async (req, res) => {
  try {
    const reward = await getResource(
      req.params.id,
      Reward.findById.bind(Reward)
    );

    // Create log event.
    logEvent(ProfileEvent, {
      message: Messages.TEMPLATE_REWARD_READ,
      owner: req.user,
      reward
    });

    res.json(createResponse(reward));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// updating a reward
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
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
