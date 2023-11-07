const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questSchema = new Schema(
  {
    category: {
      type: String,
      trim: true,
      required: "Name is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    id: {
      type: String,
      trim: true,
      required: "Name is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    tags: {
      type: Array,
      trim: true,
      required: "Name is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    difficulty: {
      type: String,
      trim: true,
      required: "Email is required",
      enum: difficulty,
    },
    regions: {
      type: Array,
      trim: true,
      minLength: [3, "Name needs at least 3 characters"],
    },
    isNiche: {
      type: Boolean,
      trim: true,
      required: "Email is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    question: {
      type: Object,
      trim: true,
      required: "Email is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    correctAnswer: {
      type: String,
      trim: true,
      required: "Email is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    incorrectAnswer: {
      type: Array,
      trim: true,
      required: "Email is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    type: {
      type: String,
      trim: true,
      required: "Email is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
const Quest = mongoose.model("Quest", questSchema);
module.exports = Quest;
