function testRoutes(fastify, options, next) {
  fastify.get('/error', async (req, reply) => {
    throw new Error('/error route')
  })
  next()
}

function routerV1(fastify, options, next) {
  fastify.register(testRoutes)
  next()
}

module.exports = function(fastify, options, next) {
  fastify.register(routerV1, {
    prefix: '/api/v1',
  })

  next()
}
