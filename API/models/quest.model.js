const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const difficulty = ["easy", "medium", "hard"];
const categories = ["music", "sport_and_culture", "film_and_tv", 
"arts_and_literature", "history", "society_and_culture", "science", "geography", "food_and_drink", "general_knowledge"]

const questSchema = new Schema(
  {
    category: {
      type: String,
      trim: true,
      required: "Category is required",
      enum: categories
   
    },
    id: {
      type: String,
      trim: true,
      required: "Id is required",
    },
    tags: {
      type: Array,
      required: "Tags is required",
    },
    difficulty: {
      type: String,
      required: "Difficulty is required",
      enum: difficulty,
    },
    regions: {
      type: Array,
    },
    isNiche: {
      type: Boolean,
      required: "Niche is required",
    },
    question: {
      type: Object,
      required: "Question is required",
    },
    correctAnswer: {
      type: String,
      required: "The correct answer is required",
    },
    incorrectAnswer: {
      type: Array,
      required: "Incorrect answer is required",
    },
    type: {
      type: String,
      required: "type is required",
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
