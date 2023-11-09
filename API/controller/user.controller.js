const User = require("../models/user.model");



module.exports.list = (req, res, next) => {
  const { name } = req.query;
  const criterial = {};
  if (name) {
    criterial.name = name;
  }

  User.find()
    .then((user) => res.json(user))
    .catch((error) => next(error));
};

// module.exports.create = (req, res, next) => {
//   User.create(req.body)
//     .then((user) => res.status(201).json(user))
//     .catch((error) => next(error));
// };

module.exports.create = (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        user.checkPassword(req.body.password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.json(user);
          } else {
            res.status(401).json({ error: "unauthorized" });
          }
        });
      } else {
        res.status(401).json({ error: "unauthorized" });
      }
    })
    .catch(next);
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
    .catch((error) => next(error));
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
};
