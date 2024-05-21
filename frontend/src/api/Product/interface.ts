import { ProductFormValues } from 'components/Product'
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

export interface GetProductResponse extends Product {}

export interface UpdateProductPayload extends Omit<ProductFormValues, 'thumbnail'> {
  thumbnail?: string | null
}

export interface ProductRecommendationResponse {
  [categoryName: string]: Product[]
}
