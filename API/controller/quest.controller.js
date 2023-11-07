const Quest = require("../models/quest.model");

module.exports.list = (req, res, next) => {
  const { name } = req.query;
  const criterial = {};
  if (name) {
    criterial.name = name;
  }
  Quest.find()
    .then((quest) => res.json(quest))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Quest.create(req.body)
    .then((quest) => res.status(201).json(quest))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Quest.findByIdAndDelete(req.params.id)
    .then((quest) => {
      if (!quest) {
        next();
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
    Quest.findById(req.params.id)
     .then((quest) => {
        if (!quest) {
            next(createError(404, "Quest not found"));
        } else {
            res.json(quest);
        }
     })
     .catch((error) => next(error))
}