import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { GetMonthlyProductConsumption } from '../../../../src/v1/products/domain/usecases/get-monthly-product-consumption'

describe('GetMonthlyProductConsumption', () => {
  let sut
  let productRepository

  beforeEach(() => {
    let productRepository = mock({
      getMonthConsumptions: vitest.fn().mockResolvedValue([
        { kw: 10, dayOfMonth: 1 },
        { kw: 12, dayOfMonth: 3 },
      ]),
    })
    sut = new GetMonthlyProductConsumption({
      productRepository,
    })
  })

  test('should return an array of 30 if the month has 30 days', async () => {
    const aprilDate = new Date(2021, 3, 1)

    const result = await sut.execute({ date: aprilDate, productId: 'any_id' })
    const expectedResult = Array.from({ length: 30 }, _ => 0)

    expectedResult[0] = 10
    expectedResult[2] = 12

    expect(result).toEqual(expectedResult)
  })

  test('should return an array of 31 if the month has 31 days', async () => {
    const januaryDate = new Date(2021, 0, 1)

    const result = await sut.execute({
      date: januaryDate,
      productId: 'any_id',
    })

    const expectedResult = Array.from({ length: 31 }, _ => 0)

    expectedResult[0] = 10
    expectedResult[2] = 12

    expect(result).toEqual(expectedResult)
  })

  test('should return an array of 28 if the month has 28 days', async () => {
    const februaryDate = new Date(2021, 1, 1)

    const result = await sut.execute({
      date: februaryDate,
      productId: 'any_id',
    })

    const expectedResult = Array.from({ length: 28 }, _ => 0)

    expectedResult[0] = 10
    expectedResult[2] = 12

    expect(result).toEqual(expectedResult)
  })

  test('should return an array of 29 if the month has 29 days', async () => {
    const februaryDate = new Date(2020, 1, 1)

    const result = await sut.execute({
      date: februaryDate,
      productId: 'any_id',
    })

    const expectedResult = Array.from({ length: 29 }, _ => 0)

    expectedResult[0] = 10
    expectedResult[2] = 12

    expect(result).toEqual(expectedResult)
  })
})
