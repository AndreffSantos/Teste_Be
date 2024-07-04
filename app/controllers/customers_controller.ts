import Address from '#models/address'
import Customer from '#models/customer'
import Phone from '#models/phone'
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
      name: payload.user.name,
      cpf: payload.user.cpf
    })

    if (Boolean(customer)) {
      const phone = await Phone.create({
        customer: customer.id,
        phone: payload.phone.phone
      })
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
        phone,
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
    const phone = await Phone.findBy('customer_id', id)

    if (!date) {
      const sales = await Sale
      .query()
      .where('customer_id', id)
      .orderBy('created_at', 'desc')   
      
      return {
        customer,
        phone,
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
        phone,
        address,
        sales
      }
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const payload  = await updateCustomerValidator.validate(request.body())
    const { id } = params
    if (payload.user) await Customer.query().where('id', id).update(payload.user)

    if (payload.address) await Address.query().where('customer_id', id).update(payload.address)
    
    if(payload.phone) await Phone.query().where('customer_id', id).update(payload.phone)
    return response.ok({ message: 'OK' })
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