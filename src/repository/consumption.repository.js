const db = require('../database/db');
const sequelize = require('sequelize');

const registerConsumption = async(current, power, kwh, consumption, idProduct) => {
    try {
        const sql = `
        INSERT INTO ConsumptionData(ElectricCurrent, Power, ConsumptionDate, Consumption, Amount, idProduct)
            VALUES(:current, :power, NOW(), :kwh, :consumption, :idProduct)`;
        const res = await db.query(sql, {
            replacements: {current, power, kwh, consumption, idProduct},
            type: sequelize.QueryTypes.INSERT
        })
        console.log(sql);
        return res;
    } catch (error) {
        return error
    }
}

const searchConsumptions = async(product ,date_initial, date_end, amount_initial, amount_end) => {
    try {
        const sql = `
        SELECT ElectricCurrent, Consumption, Power, ConsumptionDate, Amount
            FROM  ConsumptionData WHERE idProduct = :product`

        const res = await db.query(sql, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {product}
        })
        console.log(`Res sql search consumption?: ${res}`);
        return res;
    } catch (error) {
        return error
    }
}

module.exports = {registerConsumption, searchConsumptions}