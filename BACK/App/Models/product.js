const { Model, DataTypes, BOOLEAN, UUID } = require('sequelize');

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    sculptor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipping_fees: {
      type: DataTypes.INTEGER,
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
