const express = require("express");
const router = express.Router();
const users = require("../controller/user.controller");
const quests = require("../controller/quest.controller");

router.post("/users", users.create);
router.post("/login", users.login);
router.get("/users", users.list);
router.delete("/users/:id", users.delete);
router.get("/users/:id", users.detail);
router.post("/logout", users.logout);

router.get("/quests", quests.list);
router.post("/quests", quests.create);
router.delete("/quests/:id", quests.delete);
router.get("/quests/:id", quests.detail);

module.exports = router;
