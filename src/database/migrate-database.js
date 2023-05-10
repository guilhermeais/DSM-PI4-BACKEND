const { env } = require('../config/env')
const sequelize = require('./db')

async function migrateTables() {
  await sequelize.authenticate()
  console.info('Migrating Tables...')
  try {
    await sequelize.query(`
  CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Login VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );
`)

    await sequelize.query(`
  CREATE TABLE Products (
    id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    UUID VARCHAR(255) NOT NULL,
    idUser INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idUser) REFERENCES Users (id)
  );
`)

    await sequelize.query(`
  CREATE TABLE ConsumptionData (
    id INT NOT NULL AUTO_INCREMENT,
    ElectricCurrent FLOAT NOT NULL,
    Power FLOAT NOT NULL,
    ConsumptionDate DATETIME NOT NULL,
    Consumption FLOAT NOT NULL,
    Amount FLOAT NOT NULL,
    idProduct INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idProduct) REFERENCES Products (id)
  );
`)
  } catch (error) {
    console.log(error)
    throw error
  }
  console.info('Tables migrated!')
}

async function dropTables() {
  await sequelize.authenticate()

  console.info('Dropping Tables...')
  await sequelize.query(`
      DROP TABLE ConsumptionData;
    `)

  await sequelize.query(`
      DROP TABLE Products;
    `)

  await sequelize.query(`
      DROP TABLE Users;
    `)

  console.info('Tables dropped!')
}

module.exports = { migrateTables, dropTables }
if (process.argv.includes('up')) {
  migrateTables()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

if (process.argv.includes('down')) {
  dropTables()
}
