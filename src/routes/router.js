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
const {
  getBooks,
  detailBooks,
  addBooks,
  deleteBooks,
} = require("../controller/book");
const { register, login } = require("../controller/auth");

router.get("/users", getUser);
router.delete("/user/:id", deleteUser);

router.post("/register", register);
router.post("/login", login);

router.get("/category", getCategory);
router.get("/category/:id", detailCategory);
router.post("/category", addCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

router.get("/books", getBooks);
router.get("/book/:id", detailBooks);
router.post("/book", addBooks);
router.delete("/book/:id", deleteBooks);

module.exports = router;
