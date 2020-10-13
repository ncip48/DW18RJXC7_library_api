"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsToMany(models.Category, {
      //   as: "categories",
      //   through: {
      //     model: "Book",
      //     as: "category",
      //   },
      // });
      // User.hasMany(models.Book, {
      //   as: "books",
      // });
      // User.belongsTo(models.Book, {
      //   as: "users",
      //   foreignKey: {
      //     name: "userId",
      //   },
      // });
      //User.hasOne(models.Book);
      User.hasMany(models.Book, {
        as: "books",
        foreignKey: {
          name: "id_user",
        },
      });
    }
  }
  User.init(
    {
      role: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      photoProfile: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
