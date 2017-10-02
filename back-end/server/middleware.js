const mongoose = require("mongoose");

module.exports = {
  mongooseConnect: (res, req, next) => {
    if (!mongoose.connection.readyState) {
      require("../mongoose/connect")();
    }
    next();
  },
  authCheck: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.send({
        operationStatus: "failure",
        apiError: "user could not be authenticated",
        authError: true
      });
    }
  }
};
