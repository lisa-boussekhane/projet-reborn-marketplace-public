const { Model, DataTypes } = require('sequelize');

const sequelize = require('./sequelize');

class Message extends Model {}

Message.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sender_id',
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'receiver_id',
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'message',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Message;
