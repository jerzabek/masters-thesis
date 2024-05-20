import { Product } from 'model/Product'
import { deleteJson, getJson, postJson, putJson } from 'utils/api'

import { PRODUCT_FETCH_TAG } from './const'
import * as I from './interface'
import * as R from './routes'

export const getProducts = (query: I.ProductListFilters) => getJson<I.ProductListResponse>(R.getProductList(query))

export const getProduct = (id: number) =>
  getJson<I.GetProductResponse>(R.getProduct(id), { next: { tags: [PRODUCT_FETCH_TAG] } })

export const updateProduct = (id: number, payload: I.UpdateProductPayload) =>
  putJson<Product>(R.updateProduct(id), payload)

export const createProduct = (payload: I.UpdateProductPayload) => postJson<Product>(R.createProduct(), payload)

export const deleteProduct = (id: number) => deleteJson(R.deleteProduct(id))
