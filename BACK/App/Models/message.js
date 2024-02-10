const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class message extends Model {}

message.init({  
    content: {
      type: VARCHAR,
      allowNull: false
    },
  
  }, {  
    sequelize,
    modelName: 'message',
    tableName: 'message',
  });
  
  module.exports = message;