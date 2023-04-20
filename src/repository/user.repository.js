const db = require('../database/db')
const sequelize = require('sequelize')

const register = async(Nome, Email, Password) => {
   try {
    const sql = `INSERT INTO User(Login, Nome, Senha) VALUES(:Nome, :Email, :Password)`

    const res = await db.query(sql, {
        replacements: {Email: Email, Nome: Nome, Password: Password},
            type: sequelize.QueryTypes.INSERT
        })
    return res
   } catch (error) {
    console.log(error);
   }
}

const auth = (form) => {
    return 'user auth'
}

module.exports = {register, auth}