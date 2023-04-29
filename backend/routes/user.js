const express = require("express");
const router = express();
const UserController = require("../controllers/user");

router.post("/login", UserController.userLogin);

module.exports = router;
