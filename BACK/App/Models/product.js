const { Model, DataTypes, INTEGER, BOOLEAN } = require('sequelize');

const sequelize = require('./sequelize');

class product extends Model {}

product.init(
  {
    security_code: {
      type: INTEGER,
      allowNull: false,
    },
    title: {
      type: VARCHAR,
      allowNull: false,
    },
    kit_name: {
      type: VARCHAR,
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
      type: VARCHAR,
      allowNull: false,
    },
    age_range: {
      type: VARCHAR,
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
  },
  {
    sequelize,
    modelName: 'product',
    tableName: 'product',
  }
);

module.exports = product;
