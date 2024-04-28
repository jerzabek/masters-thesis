import { Category } from 'model/Category'
import { User } from 'model/User'
import { ProductAttribute } from './ProductAttribute'

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  sku: string
  quantity: number
  price: number
  attributes: ProductAttribute[]
  createdBy: User
  category: Category
  thumbnail: string
}
