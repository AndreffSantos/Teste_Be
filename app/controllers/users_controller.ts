import User from '#models/user'
import { UserValidator } from '#validators/user'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async store({ request }: HttpContext) {
    const payload = await UserValidator.validate(request.all())

    const user = await User.create({
      email: payload.email,
      password: await hash.make(payload.password)
    })

    return user
  }
}