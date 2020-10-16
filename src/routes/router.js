const express = require("express");
const router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "src/uploads" });

const {
  uploadImage,
  uploadBook,
  uploadKhususAddBook,
} = require("../middleware/upload");

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

router.get("/categories", getCategory);
router.get("/category/:id", detailCategory);
router.post("/category", authenticated, addCategory);
router.patch("/category/:id", authenticated, updateCategory);
router.delete("/category/:id", authenticated, deleteCategory);

router.get("/books", getBooks);
router.get("/book/:id", detailBooks);
router.post("/book", uploadKhususAddBook(), authenticated, addBooks);
router.delete("/book/:id", authenticated, deleteBooks);
router.patch("/book/:id", authenticated, updateBooks);

// router.post(
//   "/test_data",
//   //uploadImage("photoProfile"),
//   uploadBook("file", "thumbnail"),
//   authenticated,
//   test_data
// );
// router.post("/test2", function (req, res) {
//   const storage = multer.diskStorage({
//     destination: "src/uploads/",
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });

//   const upload = multer({
//     storage: storage,
//   }).fields([{ name: "thumbnail" }, { name: "file" }]);

//   upload(req, res, (err) => {
//     res.send({
//       message: "file success",
//     });
//   });
// });

// const storage = multer.diskStorage({
//   destination: "src/uploads/",
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// var cpUpload = multer({
//   storage: storage,
// }).fields([{ name: "thumbnail" }, { name: "file" }]);

// router.post(
//   "/test3",
//   //uploadImage("photoProfile"),
//   cpUpload,
//   authenticated,
//   test_data
// );

router.post(
  "/test4",
  //uploadImage("photoProfile"),
  uploadKhususAddBook(),
  authenticated,
  test_data
);

router.get("/my-library", authenticated, myLibrary);
router.post("/my-library", authenticated, addLibrary);
router.delete("/my-library/:id", authenticated, deleteLibrary);

module.exports = router;
