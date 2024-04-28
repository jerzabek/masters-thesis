import { BASE_API_URL } from 'api/routes'
import { ProductListFilters } from './interface'

export const productList = (query: ProductListFilters) => `${BASE_API_URL}/products${query}`
