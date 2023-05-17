import { Consumption } from '../../../src/v1/products/domain/entities/consumption.entity'
import { faker } from '@faker-js/faker'

export function mockConsumption(modification = {}) {
  return Consumption.create({
    eletricCurrent: faker.datatype.number(),
    power: faker.datatype.number(),
    productId: faker.datatype.number(),
    ...modification,
  })
}
