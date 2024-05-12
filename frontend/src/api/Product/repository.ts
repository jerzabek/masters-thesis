import { Product } from 'model/Product'
import { ProductFormValues } from 'modules/Products/Edit/components/ProductForm'
import { getJson, putJson } from 'utils/api'
import * as I from './interface'
import * as R from './routes'

export const getProducts = (query: I.ProductListFilters) => getJson<I.ProductListResponse>(R.getProductList(query))

export const getProduct = (id: number) => getJson<I.GetProductResponse>(R.getProduct(id), {})

export const updateProduct = (id: number, payload: ProductFormValues) => putJson<Product>(R.updateProduct(id), payload)
