const { User, Book, Category } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll({
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
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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
