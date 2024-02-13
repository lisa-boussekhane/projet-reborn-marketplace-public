const { Model, DataTypes } = require('sequelize');

const sequelize = require('./sequelize');

class media extends Model {}

media.init(
  {
    photo: {
      type: DataTypes.PATH,
      allowNull: false,
    },
    video: {
      type: DataTypes.PATH,
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
