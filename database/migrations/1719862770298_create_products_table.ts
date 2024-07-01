import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.integer('stock').unsigned()
      table.string('category')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}