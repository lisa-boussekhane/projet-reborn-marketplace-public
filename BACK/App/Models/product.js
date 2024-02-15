const { Model, DataTypes, INTEGER, BOOLEAN, UUID } = require('sequelize');
const ShortUniqueId = require('short-unique-id');

const sequelize = require ('./sequelize');

class product extends Model {}

product.init({  
  uniqueId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness at the database level
  },
    title: {
        type: DataTypes.STRING,
      allowNull: false,
    },
    kit_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sculptor: {
        type: INTEGER,
        allowNull: false,
      },
      size: {
        type: INTEGER,
        allowNull: false
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
        type: INTEGER,
        allowNull: false,
      },
      shipping_fees: {
        type: INTEGER,
        allowNull: false,
      },
  
  }), 
  {  
    sequelize,
    modelName: 'product',
    tableName: 'product',
  }

  product.beforeCreate((yourModelInstance, options) => {
    const uid = new ShortUniqueId({ length: 6 }); // Adjust length as needed
    yourModelInstance.uniqueId = uid();
  });
  
  module.exports = product;
