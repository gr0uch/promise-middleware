/**
 * Use callback middleware functions as promises.
 *
 * @param {...*} args
 * @param {Function} middleware
 */
module.exports = function promiseMiddleware () {
  var args = arguments

  return new Promise(function (resolve, reject) {
    // The last argument is the middleware function.
    var middleware = args[args.length - 1]

    // Exclude the last argument.
    var middlewareArguments = Array.prototype.slice.call(args, 0, -1)

    middlewareArguments.push(function (error) {
      return error ? reject(error) : resolve()
    })

    middleware.apply(middleware, middlewareArguments)
  })
}
