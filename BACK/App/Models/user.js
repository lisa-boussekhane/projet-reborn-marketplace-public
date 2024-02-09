const { Model, DataTypes, INTEGER, BOOLEAN, TIMESTAMPZ } = require('sequelize');

const sequelize = require ('./sequelize');

class user extends Model {}

user.init({  
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.TIMESTAMPZ,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duns: {
        type: INTEGER,
        allowNull: true,
      },
  
  }, {  
    sequelize,
    modelName: 'user',
    tableName: 'user',
  });
  
  module.exports = user;