const express = require("express")
const router = express.Router()
const users = require("../controller/user.controller")

router.get("/users", users.list)

module.exports = router;