const { Sequelize } = require('sequelize');

//const sequelize = new Sequelize(process.env.PG_URL, {
 // define: {
  //  underscored: true,
  //  createdAt: 'created_at',
  // updatedAt: 'updated_at',
 // }
//});

const sequelize = new Sequelize('database', 'user', 'password', {
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  dialect: 'postgres'
});

module.exports = sequelize;