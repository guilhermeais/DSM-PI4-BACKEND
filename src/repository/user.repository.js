const db = require('../database/db');
const sequelize = require('sequelize');

const register = async(Name, Email, Password) => {
   try {
    const sql = `INSERT INTO Users(Login, Name, Password) VALUES(:Email, :Name, :Password)`;

    const res = await db.query(sql, {
        replacements: {Email,Name,Password},
            type: sequelize.QueryTypes.INSERT
        })
    return res;
   } catch (error) {
    console.log(error);
   }
}

const searchUser = async (Login) => {
    try {
        const sql = `SELECT Login, Password, Name FROM Users where Login = :Login`;

        const res = await db.query(sql, {
            replacements: {Login},
            type: sequelize.QueryTypes.SELECT
        })

        return res;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {register, searchUser}