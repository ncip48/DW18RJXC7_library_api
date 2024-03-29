const { User, Book, Category } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      // include: {
      //   model: Book,
      //   as: "books",
      //   include: {
      //     model: Category,
      //     as: "category",
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      //   attributes: {
      //     exclude: [
      //       "CategoryId",
      //       "UserId",
      //       "id_user",
      //       "publication",
      //       "id_category",
      //       "pages",
      //       "aboutBook",
      //       "createdAt",
      //       "updatedAt",
      //     ],
      //   },
      // },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      message: "Response success, user loaded successfully",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.detailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      include: {
        model: Book,
        as: "books",
        include: {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: [
            "CategoryId",
            "UserId",
            "id_user",
            "publication",
            "id_category",
            "pages",
            "aboutBook",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      order: [[{ model: Book, as: "books" }, "id", "DESC"]],
    });
    res.send({
      message: "Response success, user loaded successfully",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.updatePhotoProfile = async (req, res) => {
  try {
    const { id } = req.user;
    await User.update(
      { photoProfile: req.file.filename },
      {
        where: {
          id,
        },
      }
    );
    const user = await User.findOne({
      include: {
        model: Book,
        as: "books",
        include: {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: [
            "CategoryId",
            "UserId",
            "id_user",
            "publication",
            "id_category",
            "pages",
            "aboutBook",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      where: {
        id,
      },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: `Photo picture success updated`,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `User with id ${id} has been successfully removed!`,
      data: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.test_data = async (req, res) => {
  const { id } = req.user;
  try {
    res.send({
      id,
      request: {
        thumbnail: req.files["thumbnail"][0].filename,
        title: req.body,
        file: req.files["file"][0].filename,
      },
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};
