import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column({ columnName:'customer_id' })
  declare customer: number

  @column()
  declare phone: string
}