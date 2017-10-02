const router = require("express").Router();
const { User } = require("../models");

router.post("/", (req, res) => {
  const {} = req.body;
  User.create({}).then((err) => {
    
  })
  });

router.get("/", (req, res) => {});

router.patch("/", (req, res) => {});

router.delete("/", (req, res) => {
  User.
  });

module.exports = router;
