import vine from '@vinejs/vine'

export const storeSaleValidator = vine.compile(
    vine.object({
        customer: vine.number(),
        product: vine.number(),
        amount: vine.number(),
    })
)