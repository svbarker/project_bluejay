const router = require("express").Router();
const { User } = require("../models");

router.post("/", (req, res) => {
  User.create({})
  });

router.get("/", (req, res) => {});

router.patch("/", (req, res) => {});

router.delete("/", (req, res) => {
  User.
  });

module.exports = router;
