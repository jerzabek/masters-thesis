import { BASE_API_URL } from 'api/routes'
import { ProductListFilters } from './interface'
import { query } from 'utils/api'

export const productList = (queryObject: ProductListFilters) => `${BASE_API_URL}/products${query(queryObject)}`
