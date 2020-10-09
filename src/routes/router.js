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
const { authenticated } = require("../middleware/authentication");

router.get("/users", getUser);
router.delete("/user/:id", authenticated, deleteUser);

router.post("/register", register);
router.post("/login", login);

router.get("/category", getCategory);
router.get("/category/:id", detailCategory);
router.post("/category", authenticated, addCategory);
router.patch("/category/:id", authenticated, updateCategory);
router.delete("/category/:id", authenticated, deleteCategory);

router.get("/books", getBooks);
router.get("/book/:id", detailBooks);
router.post("/book", authenticated, addBooks);
router.delete("/book/:id", authenticated, deleteBooks);

module.exports = router;
