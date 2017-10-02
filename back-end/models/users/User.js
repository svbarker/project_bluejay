const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: String,
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile"
    },
    classrooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom"
      }
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
      }
    ],
    rewards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reward"
      }
    ],
    notifications: [
      {
        message: {
          type: String,
          required: true
        },
        notificationType: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("fullname").get(function() {
  return this.profile.fullname;
});

UserSchema.virtual("password").set(function(val) {
  this.passwordHash = bcrypt.hashSync(val, 10);
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.post("find", function(result, next) {
  result.passwordHash = null;
  next(result);
});

UserSchema.post("save", function(result, next) {
  result.passwordHash = null;
  next(result);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
