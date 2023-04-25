const repository = require('../repository/consumption.repository')

const convertConsumtion = async(req, h) => {
    const {voltage, current, power } = req.payload
    const {kwh, consumption} = convertPower(power)

    await repository.registerConsumption(voltage, current, power, kwh, consumption)

    h.response({msg: 'Cadastro realizado com sucesso'}).code(201)
}

function convertPower(power){
    const cpflCost = 0.92
    const kwh = power / 100
    const consumption = kwh - cpflCost
    return {kwh, consumption}
}

module.exports = {convertConsumtion}

