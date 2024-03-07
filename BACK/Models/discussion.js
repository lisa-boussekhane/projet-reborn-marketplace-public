const { Model, DataTypes } = require('sequelize');

const sequelize = require('./sequelize');

class Discussion extends Model {}

Discussion.init(
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
    modelName: 'Discussion',
    tableName: 'discussion',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Discussion;
