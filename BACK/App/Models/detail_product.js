const { Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = require ('./sequelize');

class detail_product extends Model {}

detail_product.init({  
    localization: {
      type: DataTypes.STRING,
      allowNull: false
    },
    belly_plate: {
        type: DataTypes.STRING,      
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: INTEGER,
        allowNull: false,
      },
      eyes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hair: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
  }, {  
    sequelize,
    modelName: 'detail_product',
    tableName: 'detail_product',
  });
  
  module.exports = detail_product;