const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class shop extends Model {}

shop.init({  
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  
  }, {  
    sequelize,
    modelName: 'shop',
    tableName: 'shop',
  });
  
  module.exports = shop;