const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

require("../mongoose/connect");

// server configurations
const configs = require("./config");
const mw = require("./middleware");

// middleware
app.use(session(configs.session));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client"));
app.use(mw.mongooseConnect);
app.use(passport.initialize());
app.use(passport.session());

// passport setup
passport.serializeUser(configs.serialize);
passport.deserializeUser(configs.deserialize);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.use("/api/:param", (req, res) => require("../routers"));

io.on("connection", require("./sockets"));

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
