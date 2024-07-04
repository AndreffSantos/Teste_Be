import Product from '#models/product'
import { storeProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const products = await Product
      .query()
      .select('name', 'description')
      .whereNot('is_deleted', true)
      .orderBy('name', 'asc')
    
    return products
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await storeProductValidator.validate(request.body())

    const product = await Product.create({
      name: payload.name,
      description: payload.description,
      category: payload.category,
      price: payload.price,
      stock: payload.stock,
      isDeleted: false
    })

    return product
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params

    const product = await Product
      .query()
      .select('name', 'description', 'stock', 'category', 'price')
      .where('id', id)
      .whereNot('is_deleted', true)

    return product
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { id } = params
    const product = await Product
      .query()
      .where('id', id)
      .update(request.body())
    return product
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params
    const product = await Product.findBy('id', id)

    if (product?.isDeleted) {
      await product.delete()
    } else {
      await Product
        .query()
        .where('id', id)
        .update({ "is_deleted": true })
    }
    
    return product
  }
}