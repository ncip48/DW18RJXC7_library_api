"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Category.belongsToMany(models.User, {
      //   as: "users",
      //   through: {
      //     model: "Book",
      //     as: "info",
      //   },
      // });
      //Category.hasOne(models.Book);
      Category.hasMany(models.Book, {
        as: "books",
        foreignKey: {
          name: "id_category",
        },
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
