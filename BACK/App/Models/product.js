const { Model, DataTypes, INTEGER, BOOLEAN} = require('sequelize');


const sequelize = require('./sequelize');

class product extends Model {}

product.init(
  {
    unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kit_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sculptor: {
      type: INTEGER,
      allowNull: false,
    },
    size: {
      type: INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: INTEGER,
      allowNull: false,
    },
    age_range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authenticity_card: {
      type: BOOLEAN,
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    shipping_fees: {
      type: INTEGER,
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
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
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = product;
