import vine from '@vinejs/vine'

export const storeCustomerValidator = vine.compile(
    vine.object({
        user: vine.object({
            name: vine.string().maxLength(80).optional(),
            cpf: vine.string().regex(/[0-9]{11}/),
        }),
        address: vine.object({
            street: vine.string(),
            number: vine.number().positive(),
            apartment: vine.string().optional(),
            neighborhood: vine.string(),
            city: vine.string(),
            state: vine.string(),
            postal_code: vine.string(),
        }),
        phone: vine.object({
            phone: vine.string()
        })
    })
)

export const updateCustomerValidator = vine.compile(
    vine.object({
        user: vine.object({
            name: vine.string().maxLength(80).optional(),
            cpf: vine.string().regex(/[0-9]{11}/).optional(),
        }).optional(),
        address: vine.object({
            street: vine.string().optional(),
            number: vine.number().positive().optional(),
            apartment: vine.string().optional(),
            neighborhood: vine.string().optional(),
            city: vine.string().optional(),
            state: vine.string().optional(),
            postal_code: vine.string().optional(),
        }).optional(),
        phone: vine.object({
            phone: vine.string().optional()
        }).optional()
    })
)