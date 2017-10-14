const mongoose = require("mongoose");
const { createResponse } = require("./util");

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
      res.send(createResponse(new Error("User could not be authenticated")));
    }
  },
  socket: io => (req, res, next) => {
    req.socket = io;
    next();
  }
};
