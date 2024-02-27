const { Model, DataTypes } = require('sequelize');


const sequelize = require('./sequelize');

class User_Order_Product extends Model {}

User_Order_Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
    },
    invoice: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
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
    order_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User_Order_Product',
    tableName: 'User_Order_Product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = User_Order_Product;
