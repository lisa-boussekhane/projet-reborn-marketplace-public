const { Model, DataTypes } = require('sequelize');

const sequelize = require('./sequelize');

class Media extends Model {}

Media.init(
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
    modelName: 'Media',
    tableName: 'media',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Media;
