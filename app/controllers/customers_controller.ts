import Address from '#models/address'
import Customer from '#models/customer'
import Sale from '#models/sale'
import { storeCustomerValidator, updateCustomerValidator } from '#validators/customer'
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

    if (Boolean(customer)) {
      const address = await Address.create({
        customer: customer.id,
        apartment: payload.address.apartment,
        city: payload.address.city,
        neighborhood: payload.address.neighborhood,
        number: payload.address.number,
        postal_code: payload.address.postal_code,
        state: payload.address.state,
        street: payload.address.street,
      })

      return {
        customer,
        address
      }
    }
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
    const address = await Address.findBy('customer_id', id)

    if (!date) {
      const sales = await Sale
      .query()
      .where('customer_id', id)
      .orderBy('created_at', 'desc')   
      
      return {
        customer,
        address,
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
        address,
        sales
      }
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload  = await updateCustomerValidator.validate(request.body())
    const { id } = params
    const customer = await Customer
      .query()
      .where('id', id)
      .update(payload)

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