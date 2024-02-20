const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class Shop extends Model {}

Shop.init({  
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
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
  
  }, {  
    sequelize,
    modelName: 'Shop',
    tableName: 'shop',
  });
  
  module.exports = Shop;