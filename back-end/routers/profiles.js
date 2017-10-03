const router = require("express").Router();
const { Profile } = require("../models");
const { createResponse } = require("../server/util");

// reading a profile
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const profile = await Profile.findById(_id);
    res.json(createResponse(profile));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// updating a profile
router.patch("/:id", async (req, res) => {
  try {
    const { updates } = req.body;
    const _id = req.params.id;
    const profile = await Profile.findByIdAndUpdate(_id, updates);
    res.json(createResponse(profile));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

// deleting a profile
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const profile = await Profile.findByIdAndRemove(_id);
    res.json(createResponse(profile));
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
