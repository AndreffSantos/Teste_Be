import Customer from '#models/customer'
import Sale from '#models/sale'
import { storeCustomerValidator } from '#validators/customer'
import type { HttpContext } from '@adonisjs/core/http'

export default class CustomersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const customers = await Customer
      .query()
      .select('name', 'cpf')
      .orderBy('id', 'asc')

    return customers
  }

  /**
  * Handle form submission for the create action
  */
  async store({ request }: HttpContext) {
    const payload = await storeCustomerValidator.validate(request.all())

    const customer = await Customer.create({
      name: payload.name,
      cpf: payload.cpf
    })

    return customer
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id, date } = params

    const customer = await Customer
      .query()
      .select('name', 'cpf')
      .where('id', id)

    if (!date) {
      const sales = await Sale
      .query()
      .where('customer_id', id)
      .orderBy('created_at', 'desc')   
      
      return {
        customer,
        sales
      }
    } else {
      const month = date.split('_')[0]
      const year = date.split('_')[1]

      const sales = await Sale
      .query()
      .where('customer_id', id)
      .whereRaw('MONTH(created_at) >= ?', [month])
      .whereRaw('YEAR(created_at) >= ?', [year])
      .orderBy('created_at', 'desc')

      return {
        customer,
        sales
      }
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { id } = params
    const customer = await Customer.findBy('id', id)

    customer!.name = request.all().name || customer!.name
    customer!.cpf = request.all().cpf || customer!.cpf

    await customer?.save()

    return customer
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params

    const customer = await Customer.findBy('id', id)
    await customer?.delete()

    return customer
  }
}