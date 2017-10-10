const mongoose = require("mongoose");
const models = require("../index");

const EventSchema = new mongoose.Schema(
  {
    internal: {
      type: Boolean,
      default: true
    },
    _message: {
      type: String,
      required: true
    },
    owner: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

function templateParser(val) {
  this._message = val;
  const regex = /%(.+?)%/gi;
  let matches;
  while ((matches = regex.exec(val)) !== null) {
    const [first, second, third] = matches[1].split(".");
    if (
      !first ||
      (first && !second) ||
      !second ||
      !this[first] ||
      (this[first] && !this[first][second])
    ) {
      this._message = `ERROR: UNABLE TO PARSE TEMPLATE (${val})`;
      return;
    }

    this._message = this._message.replace(
      matches[0],
      third ? this[first][second][third] : this[first][second]
    );
  }
}

EventSchema.virtual("message").set(templateParser);

EventSchema.virtual("message").get(function() {
  return this._message;
});

EventSchema.methods.cleanForLog = function() {
  const thisObj = this.toObject();
  const modelNames = ["user", "reward", "task", "profile", "classroom"];

  for (let key in thisObj) {
    if (key !== "owner" && !modelNames.some(name => name.startsWith(key)))
      continue;

    if (this[key].cleanForLog && typeof this[key].cleanForLog === "function") {
      thisObj[key] = this[key].cleanForLog();
    } else {
      if (this[key].toObject && typeof this[key].toObject === "function") {
        thisObj[key] = this[key].toObject();
      }
    }
  }
  return thisObj;
};

EventSchema.methods.toString = function() {
  return this._message;
};

EventSchema.pre("save", async function(next) {
  const thisObj = this.toObject();
  const modelNames = Object.keys(models).map(key => key.toLowerCase());
  for (let key in thisObj) {
    if (key !== "owner" && !modelNames.some(name => name.startsWith(key)))
      continue;
    if (this[key].cleanForLog && typeof this[key].cleanForLog === "function") {
      this[key] = this[key].cleanForLog();
    } else {
      if (key !== "owner") this[key] = this[key].toObject();
    }
  }
  next();
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
