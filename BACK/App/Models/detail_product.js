const { Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = require ('./sequelize');

class detail_product extends Model {}

detail_product.init({  
    localization: {
      type: VARCHAR,
      allowNull: false
    },
    belly_plate: {
      type: VARCHAR,
      allowNull: false,
    },
    gender: {
        type: VARCHAR,
        allowNull: false
      },
      year: {
        type: INTEGER,
        allowNull: false,
      },
      eyes: {
        type: VARCHAR,
        allowNull: false
      },
      hair: {
        type: VARCHAR,
        allowNull: false,
      },
      status: {
        type: VARCHAR,
        allowNull: false,
      },
  
  }, {  
    sequelize,
    modelName: 'detail_product',
    tableName: 'detail_product',
  });
  
  module.exports = detail_product;