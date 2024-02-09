const { Model, DataTypes, INTEGER, BOOLEAN, UUID } = require('sequelize');

const sequelize = require('./sequelize');

class product extends Model {}

product.init(
  {
    security_code: {
<<<<<<< HEAD
      type: INTEGER,
      allowNull: false,
=======
        type: DataTypes.UUID,
        allowNull: false
>>>>>>> f76f0e69c457a4f779eaad1613c05f8680326e6a
    },
    title: {
        type: DataTypes.STRING,
      allowNull: false,
    },
    kit_name: {
<<<<<<< HEAD
      type: VARCHAR,
      allowNull: false,
    },
    sculptor: {
      type: INTEGER,
      allowNull: false,
    },
    size: {
      type: INTEGER,
      allowNull: false,
    },
    type: {
      type: VARCHAR,
      allowNull: false,
    },
    age_range: {
      type: VARCHAR,
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
  },
  {
    sequelize,
    modelName: 'product',
    tableName: 'product',
  }
);

module.exports = product;
=======
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
  
  }, {  
    sequelize,
    modelName: 'product',
    tableName: 'product',
  });
  
  module.exports = product;

  //blabla
>>>>>>> f76f0e69c457a4f779eaad1613c05f8680326e6a
