import { mock } from 'vitest-mock-extended'
import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { mockConsumption } from '../../../__mocks__/consumption.mock'
import { mockProduct } from '../../../__mocks__/product.mock'
import { RegisterConsumption } from '../../../../src/v1/products/domain/usecases/register-consumption'
import { EntityNotFoundError } from '../../../../src/v1/products/domain/errors/entity-not-found-error'
import { faker } from '@faker-js/faker'

describe('RegisterConsumption', () => {
  let sut
  let consumptionRepository
  let productRepository

  let mockedConsumption
  let mockedProduct

  beforeEach(() => {
    mockedConsumption = mockConsumption()
    mockedConsumption.id = faker.datatype.number()

    mockedProduct = mockProduct()
    mockedProduct.id = faker.datatype.number()

    consumptionRepository = mock({
      save: vitest.fn().mockResolvedValue(mockedConsumption),
    })

    productRepository = mock({
      findById: vitest.fn().mockResolvedValue(mockedProduct),
    })

    sut = new RegisterConsumption({
      consumptionRepository,
      productRepository,
    })
  })

  function mockDefaultParams() {
    return {
      eletricCurrent: 1,
      power: 1,
      productId: 1,
    }
  }

  test('should throw EntityNotFoundError if product does not exists', async () => {
    productRepository.findById.mockResolvedValueOnce(null)
    const params = mockDefaultParams()
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new EntityNotFoundError('Produto'))

    expect(productRepository.findById).toHaveBeenCalledWith(params.productId)
  })

  test('should save the consumption on success', async () => {
    const params = mockDefaultParams()
    const result = await sut.execute(params)

    expect(consumptionRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        eletricCurrent: params.eletricCurrent,
        power: params.power,
        kwmDate: expect.any(Date),
        kwm: expect.any(Number),
        productId: params.productId,
      })
    )
    expect(consumptionRepository.save).toHaveBeenCalledTimes(1)

    expect(result.id).toEqual(mockedConsumption.id)
    expect(result.eletricCurrent).toEqual(params.eletricCurrent)
    expect(result.power).toEqual(params.power)
    expect(result.productId).toEqual(params.productId)

  })
})