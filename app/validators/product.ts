import vine from '@vinejs/vine'

export const storeProductValidator = vine.compile(
    vine.object({
        name: vine.string(),
        description: vine.string().optional(),
        stock: vine.number().positive(),
        category: vine.string().optional(),
        price: vine.number(),
    })
)