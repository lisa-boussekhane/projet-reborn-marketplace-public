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
  },
  {
    sequelize,
    modelName: 'media',
    tableName: 'media',
  }
);

module.exports = media;
