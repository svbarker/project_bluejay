const mongoose = require("mongoose");
const User = require("./User");

const StudentSchema = new mongoose.Schema(
  {
    points: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

const Student = User.discriminator("Student", StudentSchema);
module.exports = Student;
