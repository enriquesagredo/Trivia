const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
    const { name } = req.query;
    const criterial = {}
    if (name) {
        criterial.name = name;
    }

  User.find(criterial)
    .then((user) => res.json(user))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        next();
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
    User.findById(req.params.id)
     .then((user) => {
        if (!user) {
            next(createError(404, "User not found"));
        } else {
            res.json(user);
        }
     })
     .catch((error) => next(error))
}