import * as t from 'tapdance'
import wrapper from '../lib'
import http from 'http'
import assert from 'assert'
import fetch from 'node-fetch'
import corsMiddleware from 'cors'

const cors = corsMiddleware()

const server = http.createServer(async (request, response) => {
  const middleware = wrapper.bind(null, request, response)

  await middleware(cors)

  response.end('Hello world!')
})

server.listen(1337, () => {
  fetch('http://localhost:1337')
  .then(response => {
    const { headers } = response

    t.check('cors header is correct', () =>
      assert.equal(headers.get('access-control-allow-origin'), '*'))

    return response.text()
  })
  .then(text => {
    t.check('text is correct', () =>
      assert.equal(text, 'Hello world!'))
  })
  .catch(error => {
    t.fail(error.toString())
  })
  .then(() => server.close())
})
