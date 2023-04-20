const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DATABASE}`, `${process.env.DBUSER}`, `${process.env.PASSWORD}`, {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  sequelize.authenticate()
    .then(() => {
      console.log(`Conectado ao banco ${process.env.DATABASE}`);
    })
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;