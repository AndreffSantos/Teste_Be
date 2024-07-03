import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Auth from '../auth/jwt.js'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { authorization } = ctx.request.headers()
    if (Boolean(authorization) && Auth.validateToken(authorization!)) {
      return next()
    }

    return ctx.response.unauthorized()
  }
}