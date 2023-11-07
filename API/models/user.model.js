const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      minLength: [3, "Name needs at least 3 characters"],
    },
    password: {
        type: String,
        required: true,
    }
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
const User = mongoose.model("User", userSchema);
module.exports = User;
