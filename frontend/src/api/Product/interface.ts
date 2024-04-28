import { Product } from 'model/Product'

export interface ProductListFilters {
  page?: number
  sort?: 'asc' | 'desc'
  size?: number
  categoryId?: number
  min?: number
  max?: number
}

export interface ProductListResponse {
  products: Product[]
  totalPages: number
}
