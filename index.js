const Fastify = require('fastify')
const errors = require('./error')
const apiV1Routes = require('./routes')

const getRemoteAddress = ({ headers, connection }) => {
  const forwardedFor = headers['x-forwarded-for'] || ''
  const realIP = headers['x-real-ip'] || ''

  return forwardedFor.split(',')[0] || realIP || connection.remoteAddress
}

const fastify = Fastify({
  logger: {
    serializers: {
      req: function(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
          remoteAddress: getRemoteAddress(req),
          remotePort: req.headers['x-real-port'] || req.connection.remotePort,
        }
      },
    },
  },
  ignoreTrailingSlash: true,
})

fastify.register(errors)

fastify.register(apiV1Routes)

fastify.listen(process.env.PORT || 3000, '0.0.0.0', err => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening on port ${fastify.server.address().port}`)
})
