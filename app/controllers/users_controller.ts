import User from '#models/user'
import { UserValidator } from '#validators/user'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'
import Auth from '../auth/jwt.js'

export default class UsersController {
  async store({ request }: HttpContext) {
    const payload = await UserValidator.validate(request.all())

    const user = await User.create({
      email: payload.email,
      password: await hash.make(payload.password)
    })

    return user
  }

  async login({ request, response }: HttpContext) {
    const payload = await UserValidator.validate(request.all())

    const user = await User.findBy('email', payload.email)

    if (!user) {
      return response.notFound()
    } 

    if (await hash.verify(user.password, payload.password)) {
      const token = Auth.createToken({ email: user.email })

      return { token: token }
    }
    
    return response.unauthorized()
  }
}