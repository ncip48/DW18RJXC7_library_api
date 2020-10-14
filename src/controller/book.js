const { Book, Category, User } = require("../../models");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "userId",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "CategoryId",
          "UserId",
          "id_user",
          "id_category",
          "createdAt",
          "updatedAt",
        ],
      },
    });
    res.send({
      message: "Books loaded successfully",
      data: {
        books: books,
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

exports.detailBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "userId",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "CategoryId",
          "UserId",
          "id_user",
          "id_category",
          "createdAt",
          "updatedAt",
        ],
      },
      where: {
        id,
      },
    });
    res.send({
      message: `Books with id ${id} loaded successfully`,
      data: {
        books: books,
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

exports.addBooks = async (req, res) => {
  try {
    const {
      title,
      publication,
      pages,
      ISBN,
      aboutBook,
      file,
      thumbnail,
      status,
    } = req.body;
    const id_category = req.body.category.id;
    const id_user = req.body.userId.id;
    const books = await Book.create({
      title,
      publication,
      id_category,
      id_user,
      pages,
      ISBN,
      aboutBook,
      file,
      thumbnail,
      status: status === null ? "Waiting" : status,
    });
    res.send({
      message: `Books successfully added`,
      data: {
        books: books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.updateBooks = async (req, res) => {
  try {
    const { id } = req.params;
    // const {
    //   title,
    //   publication,
    //   pages,
    //   ISBN,
    //   aboutBook,
    //   file,
    //   thumbnail,
    //   status,
    // } = req.body;
    // const id_category = req.body.category.id;
    // const id_user = req.body.userId.id;
    await Book.update(
      // {
      //   title,
      //   publication,
      //   id_category,
      //   id_user,
      //   pages,
      //   ISBN,
      //   aboutBook,
      //   file,
      //   thumbnail,
      //   status,
      // },
      req.body,
      {
        where: {
          id,
        },
      }
    );
    res.send({
      message: `Books with id ${id} has been successfully edited`,
      data: {
        books: req.body,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `Book with id ${id} has been removed successfully`,
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
