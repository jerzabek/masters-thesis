import { Product } from 'model/Product'

export interface IProductsState {
  products: Product[]
  totalPages: number
  currentPage: number
  size: number
  sort: 'asc' | 'desc'
  filters: {
    min?: number
    max?: number
  }
  search?: string
  categoryId?: number
}
