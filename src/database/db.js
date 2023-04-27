const { Sequelize } = require('sequelize');
require('dotenv').config();
const fs = require("fs")

const sequelize = new Sequelize(`${process.env.DATABASE}`, `${process.env.DBUSER}`, `${process.env.PASSWORD}`, {
  host: 'aenergy.mysql.database.azure.com',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // use this if you don't have a CA or self-signed certificate
      ca: `${process.env.CA}` // use this if you have a CA certificate
      // cert: fs.readFileSync('/path/to/client.crt'), // use this if you have a client certificate
      // key: fs.readFileSync('/path/to/client.key') // use this if you have a client key
    }
  }
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