const router = require("express").Router();
const passport = require("passport");

// passport login route
router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    // if (!user) return "???"
    req.logIn(user, err => {
      if (err) return next(err);
      // return res.json({status: "success"});
    });
  })(req, res, next);
});

router.delete("/", (req, res) => {
  req.logout();
  res.cookie("connect.sid", "", { expires: new Date() });
  res.send({ status: "success" });
});

module.exports = router;
