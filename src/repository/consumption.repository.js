const db = require('../database/db')
const sequelize = require('sequelize')

const registerConsumption = async(voltage, current, power, kwh, consumption) => {
    try {
        const sql = `
        INSERT INTO Consumo(Voltagem, Corrente, Potencia, DataConsumo, Consumo, Valor)
            VALUES(:voltage, :current, :power, NOW(), :kwh, :consumption)`
        const res = await db.query(sql, {
            replacements: {voltage, current, power, kwh, consumption},
            type: sequelize.QueryTypes.INSERT
        })

        return res
    } catch (error) {
        console.log(error);
    }
}

module.exports = {registerConsumption}