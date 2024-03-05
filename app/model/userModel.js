const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const User = sequelize.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.sync();

exports.UserModel = User;
