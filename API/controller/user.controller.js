const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
    User.find()
        .then((user) => res.json(user))
        .catch((error) => next(error))
}