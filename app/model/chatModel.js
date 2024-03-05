const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Chat = sequelize.define(
  'chat',
  {
    chat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Chat.sync();

exports.ChatModel = Chat;
