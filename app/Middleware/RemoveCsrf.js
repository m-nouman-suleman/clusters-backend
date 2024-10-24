'use strict'

class RemoveCsrf {
  async handle ({ request, shield }, next) {
    // This will ignore CSRF validation for the request
    shield.ignore(request)

    // Call the next middleware in the stack
    await next()
  }
}

module.exports = RemoveCsrf
