const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class message extends Model {}

message.init({  
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
    modelName: 'message',
    tableName: 'message',
  });
  
  module.exports = message;