const { Model, DataTypes, Path } = require('sequelize');

const sequelize = require ('./sequelize');

class media extends Model {}

media.init({  
    photo: {
      type: PATH,
      allowNull: false
    },
    video: {
      type: PATH,
      allowNull: true,
    },
  
  }, {  
    sequelize,
    modelName: 'media',
    tableName: 'media',
  });
  
  module.exports = media;