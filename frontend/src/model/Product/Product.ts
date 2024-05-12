import { Category } from 'model/Category'
import { User } from 'model/User'

import { ProductAttributeValue } from './ProductAttribute'

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  sku: string
  quantity: number
  price: number
  attributes: ProductAttributeValue[]
  createdBy: User
  category: Category
  thumbnail: string
}
