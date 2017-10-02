const router = require("express").Router();
const { Reward } = require("../models");
const { createResponse } = require("../server/util");

// creating a reward
router.post("/", async (req, res) => {
  try {
    const { kind, description, cost, teacher, status } = req.body;
    const reward = new Reward({ kind, description, cost, teacher, status });
    await reward.save();
    res.json(createResponse(reward));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// reading a reward
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const reward = await Reward.findById(_id);
    res.json(createResponse(reward));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// updating a reward
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
    const _id = req.params.id;
    const reward = await Reward.findByIdAndUpdate(_id, updates);
    res.json(createResponse(reward));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// deleting a reward
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const reward = await Reward.findByIdAndRemove(_id);
    res.json(createResponse(reward));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
