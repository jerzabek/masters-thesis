import { getJson } from 'utils/api'
import { GetProductResponse, ProductListFilters, ProductListResponse } from './interface'
import * as R from './routes'

export const getProducts = (query: ProductListFilters) => getJson<ProductListResponse>(R.getProductList(query))

export const getProduct = (id: number) => getJson<GetProductResponse>(R.getProduct(id))
