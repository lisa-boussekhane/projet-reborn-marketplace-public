<<<<<<< HEAD
const { Model, DataTypes, INTEGER, BOOLEAN, TIMESTAMP } = require('sequelize');
=======
const { Model, DataTypes, INTEGER, BOOLEAN, TIMESTAMPZ } = require('sequelize');
>>>>>>> f76f0e69c457a4f779eaad1613c05f8680326e6a

const sequelize = require('./sequelize');

class user extends Model {}

user.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
<<<<<<< HEAD
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: INTEGER,
      allowNull: false,
    },
    date_of_birth: {
      type: TIMESTAMP,
      allowNull: false,
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
  },
  {
=======
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
>>>>>>> f76f0e69c457a4f779eaad1613c05f8680326e6a
    sequelize,
    modelName: 'user',
    tableName: 'user',
  }
);

module.exports = user;
