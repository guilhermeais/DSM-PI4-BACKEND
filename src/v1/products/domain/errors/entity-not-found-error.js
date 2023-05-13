const { BaseError } = require('../../../shared/errors/base-error')

class EntityNotFoundError extends BaseError {
  constructor(entityName) {
    super({
      message: `A entidade (${entityName}) não foi encontrada.`,
      statusCode: 404,
      isOperational: true,
    })
  }
}

module.exports = { EntityNotFoundError }
