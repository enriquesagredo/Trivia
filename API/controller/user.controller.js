const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
    User.find()
        .then((user) => res.json(user))
        .catch((error) => next(error))
}

module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then((user) => res.status(201).json(user))
        .catch((error) => next(error))
}