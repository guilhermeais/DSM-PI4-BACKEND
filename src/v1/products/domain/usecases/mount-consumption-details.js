import { MathHelper } from '../../../shared/utils/math'

export class MountConsumptionDetails {
  /**
   * @param {{
   *  consumptionsInKw: number[],
   *  consumptionsInMoney: number[],
   * }} params
   * @returns {{
   *  consumptionsInKw: {
   *    data: number[],
   *    average: number,
   *    mode: number[]
   * standardDeviation: number
   *  },
   * consumptionsInMoney: {
   *    data: number[],
   *    average: number
   *    mode: number[]
   * standardDeviation: number
   *  }
   * }}
   */
  execute(params) {
    const totalConsumptionsInKwm = params.consumptionsInKw.reduce(
      (total, current) => {
        return (total += current)
      },
      0
    )

    const totalConsumptionsInMoney = params.consumptionsInMoney.reduce(
      (total, current) => {
        return (total += current)
      },
      0
    )

    const averageInKw = totalConsumptionsInKwm / params.consumptionsInKw.length
    const modeInKw = MathHelper.getMode(params.consumptionsInKw)
    const kwStandardDeviation = MathHelper.getStandardDeviation(
      params.consumptionsInKw
    )
    const maxKwmConsumption = Math.max(...params.consumptionsInKw)

    const averageInMoney =
      totalConsumptionsInMoney / params.consumptionsInMoney.length
    const modeInMoney = MathHelper.getMode(params.consumptionsInMoney)
    const moneyStandardDeviation = MathHelper.getStandardDeviation(
      params.consumptionsInMoney
    )
    const maxMoneyConsumption = Math.max(...params.consumptionsInMoney)

    return {
      consumptionsInKw: {
        average: averageInKw,
        mode: modeInKw,
        data: params.consumptionsInKw,
        max: maxKwmConsumption,
        standardDeviation: kwStandardDeviation,
      },
      consumptionsInMoney: {
        average: averageInMoney,
        mode: modeInMoney,
        data: params.consumptionsInMoney,
        max: maxMoneyConsumption,
        standardDeviation: moneyStandardDeviation,
      },
    }
  }
}
