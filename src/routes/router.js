const express = require("express");
const router = express.Router();

const { getUser, deleteUser } = require("../controller/user");
const {
  getCategory,
  detailCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");

router.get("/users", getUser);
router.delete("/user/:id", deleteUser);

router.get("/category", getCategory);
router.get("/category/:id", detailCategory);
router.post("/category", addCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
