"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Book.hasOne(models.User);
      Book.belongsTo(models.User, {
        as: "userId",
        foreignKey: {
          name: "id_user",
        },
      });
      Book.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "id_category",
        },
      });
      // Book.belongsToMany(models.User, {
      //   as: "user",
      //   through: {
      //     model: "Library",
      //     as: "info",
      //   },
      // });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      publication: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      pages: DataTypes.INTEGER,
      ISBN: DataTypes.STRING,
      aboutBook: DataTypes.TEXT,
      file: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
