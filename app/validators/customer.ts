import vine from '@vinejs/vine'

export const storeCustomerValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(80).optional(),
        cpf: vine.string().regex(/[0-9]{11}/)
    })
)