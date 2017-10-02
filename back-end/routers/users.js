const router = require("express").Router();

router.post("/");

router.get("/", (req, res) => {
  res.send("users accessed");
});

router.patch("/");

router.delete("/");

module.exports = router;
