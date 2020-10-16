const { Category, Book, User } = require("../../models");

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
      // include: {
      //   model: Book,
      //   as: "books",
      //   include: {
      //     model: User,
      //     as: "userId",
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
      //       "isbn",
      //       "aboutBook",
      //       "createdAt",
      //       "updatedAt",
      //     ],
      //   },
      // },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Categories loaded successfully",
      data: {
        categories: categories,
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

exports.detailCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Category.findOne({
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
            "CategoryId",
            "UserId",
            "publication",
            "id_category",
            "id_user",
            "pages",
            "isbn",
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
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: `Category with id ${id} loaded successfully`,
      data: {
        category: categories,
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

exports.addCategory = async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    if (categories) {
      const categoryResult = await Category.findOne({
        where: {
          id: categories.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: `Category successfully created`,
        data: {
          category: categoryResult,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Category.update(req.body, {
      where: {
        id,
      },
    });

    if (categories) {
      const categoryResult = await Category.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: `Category with id ${id} successfully edited`,
        data: {
          category: categoryResult,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `Category with id ${id} has been removed successfully`,
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
