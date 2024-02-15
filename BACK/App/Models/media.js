const { Model, DataTypes } = require('sequelize');

const sequelize = require('./sequelize');

class media extends Model {}

media.init(
  {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    video: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'media',
    tableName: 'media',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = media;
