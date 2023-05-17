import { QueryTypes } from 'sequelize'
import sequelizeDb from '../../../config/database/sequelize-db'
import { ProductRepository } from '../../domain/protocols/repositores/product.repository'
import { Product } from '../../domain/entities/product.entity'
import { Consumption } from '../../domain/entities/consumption.entity'

export class SequelizeProductRepository extends ProductRepository {
  async findById(id) {
    const sql = `
    SELECT P.Name, P.id, P.UUID, P.idUser FROM Products as P 
    WHERE P.id = :id
    `

    const [dbUser] = await sequelizeDb.query(sql, {
      type: QueryTypes.SELECT,
      replacements: { id },
    })

    return Product.create({
      id: dbUser.id,
      name: dbUser.Name,
      uuid: dbUser.UUID,
      userId: dbUser.idUser,
    })
  }

  /**
   *
   * @param {Consumption} consumption
   * @returns
   */
  async registerConsumption(consumption) {
    const { eletricCurrent, power, kwm, kwmDate, productId } = consumption
    const sql = `
          INSERT INTO ConsumptionData(EletricCurrent, Power, KwmDate, Kwm, idProduct)
              VALUES(:current, :power, :now, :kwm, :idProduct)`

    const [id] = await sequelizeDb.query(sql, {
      replacements: {
        current: eletricCurrent,
        power,
        kwm,
        idProduct: productId,
        now: kwmDate,
      },
      type: QueryTypes.INSERT,
    })

    return { id }
  }
}
