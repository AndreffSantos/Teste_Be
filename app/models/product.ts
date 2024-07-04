import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string
  
  @column()
  declare description: string

  @column()
  declare stock: number

  @column()
  declare category: string

  @column()
  declare price: number

  @column({ columnName: 'is_deleted' })
  declare isDeleted: boolean
}