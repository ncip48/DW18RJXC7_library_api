var multer = require("multer");

exports.uploadImage = (fileName) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads/img");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = {
        message: "Only image files are allowed!",
      };
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  };

  const maxSize = 2 * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(fileName);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !err)
        return res.status(400).send({
          message: "Please select an image to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 2MB",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};

exports.uploadBook = (thumbnail) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads/books");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const pdfFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(epub|pdf|EPUB|PDF)$/)) {
      req.fileValidationError = {
        message: "Only pdf/epub files are allowed!",
      };
      return cb(new Error("Only pdf/epub files are allowed!"), false);
    }
    cb(null, true);
  };

  //const maxSize = 2 * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter: pdfFilter,
    // limits: {
    //   fileSize: maxSize,
    // },
  }).single(thumbnail);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !err)
        return res.status(400).send({
          message: "Please select an pdf/epub to upload",
        });

      return next();
    });
  };
};

exports.uploadKhususAddBook = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      file.fieldname === "thumbnail"
        ? cb(null, "src/uploads/img")
        : cb(null, "src/uploads/books");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  var cpUpload = multer({
    storage: storage,
  }).fields([{ name: "thumbnail" }, { name: "file" }]);

  return (req, res, next) => {
    cpUpload(req, res, function (err) {
      return next();
    });
  };
};
