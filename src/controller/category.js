const { Category } = require("../../models");

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
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
    const categories = await Category.findAll({
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

exports.addCategory = async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.send({
      message: `Category successfully created`,
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

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Category.update(req.body, {
      where: {
        id,
      },
    });
    res.send({
      message: `Category with id ${id} successfully edited`,
      data: {
        categories: req.body,
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
