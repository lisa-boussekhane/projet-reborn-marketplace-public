const { Model, DataTypes } = require('sequelize');

const sequelize = require('./sequelize');

class User_Discuss_Message extends Model {}

User_Discuss_Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User_Discuss_Message',
    tableName: 'User_Discuss_Message',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = User_Discuss_Message;
