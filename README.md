# Promise Middleware

[![Build Status](https://img.shields.io/travis/0x8890/promise-middleware/master.svg?style=flat-square)](https://travis-ci.org/0x8890/promise-middleware)
[![npm Version](https://img.shields.io/npm/v/promise-middleware.svg?style=flat-square)](https://www.npmjs.com/package/promise-middleware)
[![License](https://img.shields.io/npm/l/promise-middleware.svg?style=flat-square)](https://raw.githubusercontent.com/0x8890/promise-middleware/master/LICENSE)

This module wraps HTTP callback-based middlewares that follow the convention `(req, res, next)` popularized by frameworks such as Connect and Express, and turns them into promises. This enables them to be used in a generic manner without frameworks, and with flow control features such as `async`/`await`.

```
$ npm install promise-middleware
```


## Usage

```js
import http from 'http'
import middlewareWrapper from 'promise-middleware'
import corsMiddleware from 'cors'

const cors = corsMiddleware()

// ES7 example.
http.createServer(async (request, response) => {
  // The signature of the wrapper function is typically `request`, `response`,
  // and lastly `middleware`, which is a function that typically accepts the
  // arguments `req`, `res`, `next`.
  const middleware = fn => middlewareWrapper(request, response, fn)

  await middleware(cors)

  response.end('Hello world!')
})

.listen(1337)
```


## License

This software is licensed under the [MIT License](//github.com/0x8890/promise-middleware/blob/master/LICENSE).
