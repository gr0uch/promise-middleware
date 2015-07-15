import { check, fail } from 'tapdance'
import wrapper from '../lib'
import http from 'http'
import assert from 'assert'
import fetch from 'node-fetch'
import cors from 'cors'


const corsMiddleware = cors()

const server = http.createServer(async (request, response) => {
  const middleware = wrapper.bind(null, request, response)

  await middleware(corsMiddleware)

  response.end('Hello world!')
})


server.listen(1337, () => {
  fetch('http://localhost:1337')

  .then(response => {
    const { headers } = response

    check('cors header is correct', () =>
      assert.equal(headers.get('access-control-allow-origin'), '*'))

    return response.text()
  })

  .then(text => check('text is correct', () =>
    assert.equal(text, 'Hello world!')))

  .catch(error => fail(error.toString()))

  .then(() => server.close())
})
