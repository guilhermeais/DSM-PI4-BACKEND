const repository = require("../repository/consumption.repository");

const convertConsumtion = async (req, h) => {
  const { current, power, idProduct } = req.payload;
  const { kwh, consumption } = convertPower(power);

  await repository.registerConsumption(
    current,
    power,
    kwh,
    consumption,
    idProduct
  );

  return h.response({ msg: "Cadastro realizado com sucesso" }).code(201);
};

function convertPower(power) {
  const cpflCost = 0.92;
  const kwh = power / 100;
  const consumption = kwh * cpflCost;
  return { kwh, consumption };
}

const searchConsumptions = async (req, h) => {
  //pegando os parametro caso exista
  const {
    date_initial = "",
    date_end = "",
    amount_initial = "",
    amount_end = "",
  } = req.query;
  const { product } = req.params;

  //buscando os dados no repository
  const consumptions = await repository.searchConsumptions(
    product,
    date_initial,
    date_end,
    amount_initial,
    amount_end
  );

  if(consumptions.length > 0){
    const consumptionFormat = await createPayloadResponse(consumptions);
    return h.response(consumptionFormat).code(200);
  }
  return h.response({msg: 'Sem registro para esse produto'}).code(404);
};


//função para formatar a resposta do banco
function createPayloadResponse(consumptions) {
  let consumptionResponse = [];
  let consumptionDetail = [];

  for (let i = 0; i < consumptions.length; i++) {
    consumptionDetail.push({
      ElectricCurrent: consumptions[i].ElectricCurrent,
      Power: consumptions[i].Power,
      Consumption: consumptions[i].Consumption,
      Amount: consumptions[i].Amount,
    });

    consumptionResponse.push({
      Datetime: consumptions[i].ConsumptionDate,
      ConsumptionDetail: consumptionDetail[i],
    });
  }

  return consumptionResponse;
}

module.exports = { convertConsumtion, searchConsumptions };
