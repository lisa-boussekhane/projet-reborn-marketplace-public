const { Model, DataTypes, INTEGER, BOOLEAN, UUID } = require('sequelize');

const sequelize = require('./sequelize');

class product extends Model {}

product.init(
  {
    security_code: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
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
