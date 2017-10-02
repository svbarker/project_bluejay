const router = require("express").Router();
const passport = require("passport");

// passport login route
router.get("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    // if (!user) return "???"
    req.logIn(user, err => {
      if (err) return next(err);
      // return res.json({status: "success"});
    });
  })(req, res, next);
});

module.exports = router;
