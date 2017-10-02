// configure environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const expressSession = require("express-session");
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

require("../mongoose/connect");

// server configurations
const configs = require("./config");
const mw = require("./middleware");

// middleware
app.use(expressSession(configs.session));
// app.use(express.static("front-end???"));
app.use(mw.mongooseConnect);

// passport setup
passport.use(expressSession);
passport.initialize();
passport.serializeUser(configs.serialize);
passport.deserializeUser(configs.deserialize);

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/", (req, res) => {
  res.send("server running");
});

io.on("connection", require("./sockets"));

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
