var mongoose = require("mongoose");
var Promise = require("bluebird");
mongoose.Promise = Promise;
var env = process.env.NODE_ENV || "development";
var config = require("./config/mongo")[env];

module.exports = () => {
  var envUrl = process.env[config.use_env_variable];
  var localUrl = `mongodb://${config.host}/${config.database}`;
  var mongoUrl = envUrl ? envUrl : localUrl;
  return mongoose.connect(mongoUrl, { useMongoClient: true });
};
