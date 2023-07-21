'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Admin',
    hooks: {
      beforeCreate: async (admin) => {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = hashedPassword;
      },
    },
  });
  return Admin;
};
