const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Message = sequelize.define(
  'message',
  {
    messageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Message.sync({ force: true });

exports.MessageModel = Message;
