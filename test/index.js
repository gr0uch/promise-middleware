const tapdance = require('tapdance')
const run = tapdance.run
const pass = tapdance.pass
const fail = tapdance.fail
const wrapper = require('../lib')
const http = require('http')
const assert = require('assert')
const fetch = require('node-fetch')
const cors = require('cors')

const corsMiddleware = cors()

const server = http.createServer((request, response) => {
  const middleware = wrapper.bind(null, request, response)

  return middleware(corsMiddleware)
  .then(() => response.end('Hello world!'))
})

run(() => new Promise((resolve, reject) => server.listen(1337, () => {
  fetch('http://localhost:1337')

  .then(response => {
    const headers = response.headers

    pass(() => assert.equal(headers.get('access-control-allow-origin'), '*'),
      'cors header is correct')

    return response.text()
  })

  .then(text => pass(() => assert.equal(text, 'Hello world!'),
    'text is correct'))

  .catch(error => reject(fail(error)))

  .then(() => resolve(server.close()))
})))
