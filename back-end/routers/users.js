const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("user accessed");
});

module.exports = router;
