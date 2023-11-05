const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
    name: {
        type: String,
        trim: true,
        require: "Name is required",
        minLength: [3, "Name needs at least 3 characters"]
    },
    email: {
        type: String,
        trim: true,
        require: "Email is required",
        minLength: [3, "Name needs at least 3 characters"]
    },
},
    {
        timestamps: true,
    }
)
const User = mongoose.model("User", userSchema)
module.exports = User