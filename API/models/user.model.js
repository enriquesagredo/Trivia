const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const WORK_FACTOR = 10



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
    },

    score: {
        type: Number,
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

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, WORK_FACTOR)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((error) => {
        console.error("Password hash process failed", error);
        next(error);
      });
  }
});

userSchema.methods.checkPassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
