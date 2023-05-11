import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import supertest from 'supertest'
import { dropTables, migrateTables } from '../../src/database/migrate-database'
import { faker } from '@faker-js/faker'
import sequelize from '../../src/database/db'
import server from '../../src/server'
import MockDate from 'mockdate'
import moment from 'moment'

describe('Consumption E2E Suite', () => {
  describe('POST /consumption', () => {
    const actualDate = new Date()

    beforeEach(async () => {
      MockDate.set(actualDate)
      await migrateTables()
    })

    afterEach(async () => {
      MockDate.reset()
      await dropTables()
    })

    async function makeUser() {
      const user = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      const [id] = await sequelize.query(
        `
        INSERT INTO Users (Name, Login, Password) VALUES
         ('${user.name}', '${user.email}', '${user.password}');`
      )
      user.id = id
      return user
    }

    async function makeProduct(user) {
      const product = {
        name: 'Product 1',
        uuid: faker.datatype.uuid(),
        userId: user.id,
      }

      const [id] = await sequelize.query(
        `
        INSERT INTO Products (Name, UUID, idUser) VALUES
          ('${product.name}', '${product.uuid}', '${product.userId}');`
      )
      product.id = id

      return product
    }

    test('should save the consumption converted on the database', async () => {
      const user = await makeUser()
      const product = await makeProduct(user)

      const given = {
        current: 2.5,
        power: 62.5,
        idProduct: product.id,
      }

      const response = await supertest(server.listener)
        .post('/consumption')
        .send(given)

      expect(response.status).toBe(201)

      const [[dbConsumption]] = await sequelize.query(
        `SELECT * FROM ConsumptionData;`
      )

      const expectedKwm = 0.001042 

      const expectedConsumption = {
        id: expect.any(Number),
        Power: given.power,
        EletricCurrent: given.current,
        Kwm: expectedKwm,
        KwmDate: moment(actualDate).format('yyyy-MM-dd HH:mm:ss'),
        idProduct: given.idProduct,
      }

      expect({
        ...dbConsumption,
        KwmDate: moment(dbConsumption.KwmDate).format(
          'yyyy-MM-dd HH:mm:ss'
        ),
      }).toEqual(expectedConsumption)
    })
  })
})
