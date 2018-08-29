# fastify-errors-handler-test

`git clone git@github.com:fox1t/fastify-errors-handler-test.git && cd fastify-errors-handler-test && npm i && node index.js`

`curl http://localhost:3000/api/v1/error` 

and see logs: no error logging at all

if `fastify.register(errors)` is commented out, it works as expected.

