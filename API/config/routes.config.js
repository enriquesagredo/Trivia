const express = require("express")
const router = express.Router()
const users = require("../controller/user.controller")

router.get("/users", users.list)
router.post("/users", users.create)
router.delete("/users/:id", users.delete)
router.get("/users/:id", users.detail)



module.exports = router;