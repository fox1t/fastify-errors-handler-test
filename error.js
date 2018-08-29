const fp = require('fastify-plugin')

const codes = {
  INVALID_OBJECT_ID: 400,
  MISSING_OBJECT_ID: 400,
  EMPTY_DOCUMENT: 400,
  MISSING_UNIQUE_KEY: 400,
  MISSING_MANDATORY_PRAMETER: 400,
  DUPLICATED_DOCUMENT: 409,
  DOCUMENT_NOT_FOUND: 404,
  MISSING_AUTH_DATA: 400,
  CREDENTIALS_NOT_VALID: 400,
  TOKEN_NOT_VALID: 401,
  INCOMPATIBLE_CHANGE_STATUS: 400,
  DOCUMENT_VALIDATION_ERROR: 400,
  GENERIC_ERROR: 500,
}

const getStatusCode = (code = 'GENERIC_ERROR') => codes[code] || codes.GENERIC_ERROR

const errorHandler = (error, req, reply) => {
  if (error.validation) {
    error.code = 'DOCUMENT_VALIDATION_ERROR'
    error.details = error.validation
  }
  const statusCode = getStatusCode(error.code)
  reply.code(statusCode)

  const response =
    statusCode !== 500
      ? {
          error: error.code,
          message: error.message,
          statusCode,
          details: error.details,
        }
      : {
          error: error.code,
          message: 'Something went wrong. Try again later.',
          statusCode,
        }

  reply.send(response)
}

module.exports = fp(function errorPlugin(fastify, _, next) {
  fastify.setErrorHandler(errorHandler)
  next()
})
module.exports.errorHandler = errorHandler
