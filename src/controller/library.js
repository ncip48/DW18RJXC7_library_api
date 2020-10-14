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

exports.addLibrary = async (req, res) => {
  try {
    const { id } = req.user;

    //check if books already in library
    const check = await Library.findOne({
      where: {
        userId: req.user.id,
        bookId: req.body.bookId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    //if already then
    if (check) {
      return res.status(400).send({
        error: {
          message: "Books has been already added to library",
        },
      });
    }

    //if not in library
    await Library.create({
      userId: req.user.id,
      bookId: req.body.bookId,
    });
    res.send({
      message: "Your book has been added successfully",
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

exports.deleteLibrary = async (req, res) => {
  try {
    const { id } = req.user;
    await Library.destroy({
      where: {
        userId: req.user.id,
        bookId: req.params.id,
      },
    });
    res.send({
      message: "Your book has been successfully removed from library",
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
