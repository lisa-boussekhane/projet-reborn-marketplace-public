const { Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = require('./sequelize');

class detail_product extends Model {}

detail_product.init(
  {
    localization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    belly_plate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: INTEGER,
      allowNull: false,
    },
    eyes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hair: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'detail_product',
    tableName: 'detail_product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = detail_product;
