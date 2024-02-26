const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
  underscored: true,
  created_at: 'created_at',
  updated_at: 'updated_at',
  dialect: 'postgres',
});

module.exports = sequelize;
