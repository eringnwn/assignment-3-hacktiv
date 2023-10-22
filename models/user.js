'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Photo);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This username has been used",
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This email has been registered",
      },
      allowNull: false,
      validate: {
        is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashPassword(user.password);
        user.password = hashedPassword;
      }
    }
  });
  return User;
};