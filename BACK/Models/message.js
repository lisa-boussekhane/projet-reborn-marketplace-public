const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class Message extends Model {}

Message.init({  
    content: {
        type: DataTypes.STRING,
        allowNull: false
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
    modelName: 'Message',
    tableName: 'message',
  });
  
  module.exports = Message;