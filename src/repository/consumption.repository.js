const db = require('../database/db');
const sequelize = require('sequelize');

const registerConsumption = async(voltage, current, power, kwh, consumption, idProduct) => {
    try {
        const sql = `
        INSERT INTO ConsumptionData(Voltage, ElectricCurrent, Power, ConsumptionDate, Consumption, Amount, idProduct)
            VALUES(:voltage, :current, :power, NOW(), :kwh, :consumption, :idProduct)`;
        const res = await db.query(sql, {
            replacements: {voltage, current, power, kwh, consumption, idProduct},
            type: sequelize.QueryTypes.INSERT
        })

        return res;
    } catch (error) {
        return error
    }
}

const searchConsumptions = async(product ,date_initial, date_end, amount_initial, amount_end) => {
    try {
        const sql = `
        SELECT ElectricCurrent, Consumption, Voltage, Power, ConsumptionDate, Amount
            FROM  ConsumptionData WHERE idProduct = :product`

        const res = await db.query(sql, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {product}
        })

        return res;
    } catch (error) {
        return error
    }
}

module.exports = {registerConsumption, searchConsumptions}