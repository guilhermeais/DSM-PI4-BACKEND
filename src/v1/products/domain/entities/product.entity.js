const { randomUUID } = require('crypto');

class Product {
  constructor({
    id,
    name,
    userId,
    uuid,
  }) {
    this.id = id
    this.name = name
    this.userId = userId
    this.uuid = uuid || randomUUID()
  }
}

module.exports = { Product }