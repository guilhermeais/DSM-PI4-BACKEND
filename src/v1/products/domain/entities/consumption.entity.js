class Consumption {
  constructor({ id, eletricCurrent, power, kwmDate, productId }) {
    this.id = id
    this.eletricCurrent = eletricCurrent
    this.power = power
    this.kwmDate = kwmDate
    this.productId = productId
    this.kwm = Number(this.power / 60 / 1000)
  }

  static create({ id, eletricCurrent, power, kwmDate, productId }) {
    return new Consumption({ id, eletricCurrent, power, kwmDate, productId })
  }
}

module.exports = { Consumption }