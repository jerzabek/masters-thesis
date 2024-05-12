import { BASE_API_URL } from 'api/routes'
import { query } from 'utils/api'

import { ProductListFilters } from './interface'

export const getProductList = (queryObject: ProductListFilters) => `${BASE_API_URL}/products${query(queryObject)}`

export const getProduct = (id: number) => `${BASE_API_URL}/products/${id}`

export const updateProduct = (id: number) => `${BASE_API_URL}/products/${id}`
