module.exports = {
  mongooseConnect: (res, req, next) => {
    if (!mongoose.connection.readyState) {
      require("../mongoose/connect")();
    }
    next();
  }
};
