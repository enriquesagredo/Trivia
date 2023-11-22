const User = require('../models/user.model');

module.exports.userscores = (req, res, next) => {
    User.find()
        .then((users) => {res.status(200).json({users})})
        .catch((error) => next(error))
}

  