const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      enum: ["loot", "point"]
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    },
    status: {
      type: String,
      enum: ["Unredeemed", "Pending", "Redeemed"],
      default: "Unredeemed"
    },
    supply: {
      type: Number,
      default: 1
    },
    rejectedCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

RewardSchema.methods.toNewObject = function() {
  const newObj = this.toObject();
  delete newObj._id;
  return newObj;
};

RewardSchema.methods.cleanForLog = function() {
  const obj = this.toObject();
  return {
    id: obj._id,
    kind: obj.kind,
    title: obj.title,
    description: obj.description,
    teacher: obj.teacher,
    status: obj.status
  };
};

RewardSchema.methods.toString = function() {
  return this.title;
};

const Reward = mongoose.model("Reward", RewardSchema);
module.exports = Reward;
