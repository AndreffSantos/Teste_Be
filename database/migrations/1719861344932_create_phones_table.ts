import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'phones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').notNullable().unsigned().references('customers.id').onDelete('CASCADE')
      table.string('phone').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}