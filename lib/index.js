'use strict'

promiseMiddleware.Promise = Promise
module.exports = promiseMiddleware


/**
 * Use callback middleware functions as promises.
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} middleware
 */
function promiseMiddleware (request, response, middleware) {
  return new promiseMiddleware.Promise(function (resolve, reject) {
    middleware(request, response, function next (error) {
      return error ? reject(error) : resolve()
    })
  })
}
