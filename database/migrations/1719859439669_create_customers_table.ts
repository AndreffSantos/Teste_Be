import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 80).nullable()
      table.string('cpf', 14).notNullable().unique()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}