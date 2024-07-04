import Product from '#models/product'
import Sale from '#models/sale'
import { storeSaleValidator } from '#validators/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await storeSaleValidator.validate(request.body())
    const product = await Product.findBy('id', payload.product)

    const sale = await Sale.create({
      customer: payload.customer,
      product: payload.product,
      amount: payload.amount,
      unitPrice: product?.price,
      totalPrice: (payload.amount * product!.price)
    })

    product!.stock -= payload.amount
    await product?.save()

    return sale
  }
}