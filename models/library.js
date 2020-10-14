"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Library.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      Library.belongsTo(models.Book, {
        as: "books",
        foreignKey: {
          name: "bookId",
        },
      });
    }
  }
  Library.init(
    {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Library",
    }
  );
  return Library;
};
