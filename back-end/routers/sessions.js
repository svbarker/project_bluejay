const router = require("express").Router();
const { createResponse } = require("../server/util");
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

router.delete("/", async (req, res) => {
  try {
    await req.logout(() => {});
    res.cookie("connect.sid", "", { expires: new Date() });
    res.json(createResponse());
  } catch (error) {
    res.json(createResponse(error));
  }
});

module.exports = router;
