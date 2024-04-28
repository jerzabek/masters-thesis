import { getJson } from 'utils/api'
import { ProductListFilters, ProductListResponse } from './interface'
import { productList } from './routes'

export const getProducts = (query: ProductListFilters) => getJson<ProductListResponse>(productList(query))
