const { Model, DataTypes } = require('sequelize');

const sequelize = require('./sequelize');

class User_Rate_Shop extends Model {}

Shop.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
  },
  {
    sequelize,
    modelName: 'User_rate_shop',
    tableName: 'User_Rate_Shop',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = User_Rate_Shop;