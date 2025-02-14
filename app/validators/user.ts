import vine from '@vinejs/vine'

export const UserValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(4),
    })
)