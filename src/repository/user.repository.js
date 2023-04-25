const db = require('../database/db')
const sequelize = require('sequelize')

const register = async(Nome, Email, Password) => {
   try {
    const sql = `INSERT INTO Usuarios(Email, Nome, Senha) VALUES(:Email, :Nome, :Password)`

    const res = await db.query(sql, {
        replacements: {Email: Email, Nome: Nome, Password: Password},
            type: sequelize.QueryTypes.INSERT
        })
    return res
   } catch (error) {
    console.log(error);
   }
}

const searchUser = async (Login) => {
    try {
        const sql = `SELECT Email, Senha, Nome FROM Usuarios where Email = :login`

        const res = await db.query(sql, {
            replacements: {login: Login},
            type: sequelize.QueryTypes.SELECT
        })

        return res

    } catch (error) {
        console.log(error);
    }
}

module.exports = {register, searchUser}