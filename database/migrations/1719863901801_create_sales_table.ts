import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').notNullable().unsigned().references('customers.id').onDelete('CASCADE')
      table.integer('product_id').notNullable().unsigned().references('products.id').onDelete('CASCADE')
      table.integer('amount').notNullable()
      table.decimal('unit_price').notNullable()
      table.decimal('total_price').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}