// npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const localStrategy = require("passport-local").Strategy;

// connect to database
require("../mongoose/connect")();

// server configurations
const configs = require("./config");
const mw = require("./middleware");

// middleware
app.use(session(configs.session));
app.use(bodyParser.json());
app.use(express.static("client"));
app.use(mw.mongooseConnect);
app.use(passport.initialize());
app.use(passport.session());
// app.use("/api", mw.authCheck);
// app.use(mw.logger);

require("../routers/teachers");

// passport setup
passport.serializeUser(configs.serialize);
passport.deserializeUser(configs.deserialize);
passport.use(new localStrategy(require("../strategies/local")));

// serve static resource
// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// session handling routes
app.use("/sessions", require("../routers/sessions"));

// api routes
app.use("/api/:resource", require("../routers"));

// web sockets
io.on("connection", require("./sockets"));

// start server
process.env.NODE_ENV === "production"
  ? server.listen(configs.port, configs.serverCallback)
  : server.listen(configs.port, configs.host, configs.serverCallback);
