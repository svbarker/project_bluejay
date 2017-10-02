const { User } = require("../models");

module.exports = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username });
    if (user && user.validatePassword(password)) {
      done(null, user);
    } else {
      done(null, false, { message: "validation failed" });
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};
