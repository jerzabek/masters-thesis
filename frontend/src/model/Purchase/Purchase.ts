import { Product } from 'model/Product'
import { User } from 'model/User'

export interface Purchase {
  id: number
  createdBy: User
  timestamp: string
  total: number
  products: PurchasedProduct[]
}

export interface PurchasedProduct {
  id: number
  product: Product
  productName: string
  quantity: number
  price: number
  attributes: [
    {
      id: number
      name: string
      value: string
    },
  ]
}
