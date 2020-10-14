const { Book, Library, User } = require("../../models");

exports.myLibrary = async (req, res) => {
  try {
    const { id } = req.user;
    const library = await Library.findAll({
      include: {
        model: Book,
        as: "books",
        include: {
          model: User,
          as: "userId",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: [
            "id_category",
            "id_user",
            "createdAt",
            "updatedAt",
            "publication",
            "pages",
            "ISBN",
            "aboutBook",
            "file",
          ],
        },
      },
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["bookId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: `Your library has been successfully loaded`,
      data: {
        library: library,
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
