const express = require("express");
const router = express.Router();

const { getUser, deleteUser } = require("../controller/user");

router.get("/users", getUser);
router.delete("/user/:id", deleteUser);
//router.get("/user/:id", detailUser);

module.exports = router;
