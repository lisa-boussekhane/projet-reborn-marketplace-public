const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class shop extends Model {}

shop.init({  
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
  
  }, {  
    sequelize,
    modelName: 'shop',
    tableName: 'shop',
  });
  
  module.exports = shop;