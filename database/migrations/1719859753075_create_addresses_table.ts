import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('customer_id').notNullable().unsigned().references('customers.id').onDelete('CASCADE')
      table.string('street').notNullable()
      table.integer('number').notNullable()
      table.string('apartment').nullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state', 2).notNullable()
      table.string('postal_code').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}