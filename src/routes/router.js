const express = require("express");
const router = express.Router();

const { uploadImage } = require("../middleware/upload");

const {
  getUser,
  detailUser,
  deleteUser,
  updatePhotoProfile,
  test_data,
} = require("../controller/user");
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
  updateBooks,
} = require("../controller/book");
const { register, login, checkAuth } = require("../controller/auth");
const {
  myLibrary,
  addLibrary,
  deleteLibrary,
} = require("../controller/library");
const { authenticated } = require("../middleware/authentication");

router.get("/users", getUser);
router.get("/user/:id", detailUser);
router.delete("/user/:id", authenticated, deleteUser);
router.patch(
  "/edit_photo",
  uploadImage("photoProfile"),
  authenticated,
  updatePhotoProfile
);

router.post("/register", register);
router.post("/login", login);
router.get("/auth", authenticated, checkAuth);

router.get("/category", getCategory);
router.get("/category/:id", detailCategory);
router.post("/category", authenticated, addCategory);
router.patch("/category/:id", authenticated, updateCategory);
router.delete("/category/:id", authenticated, deleteCategory);

router.get("/books", getBooks);
router.get("/book/:id", detailBooks);
router.post("/book", authenticated, addBooks);
router.delete("/book/:id", authenticated, deleteBooks);
router.patch("/book/:id", authenticated, updateBooks);

router.patch(
  "/test_data",
  uploadImage("photoProfile"),
  authenticated,
  test_data
);

router.get("/my-library", authenticated, myLibrary);
router.post("/my-library", authenticated, addLibrary);
router.delete("/my-library/:id", authenticated, deleteLibrary);

module.exports = router;
