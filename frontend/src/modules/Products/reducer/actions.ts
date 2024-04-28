import { Product } from 'model/Product'
import { SetProductsAction } from './interface'

/** Products */

export const setProducts = (products: Product[], totalPages: number): SetProductsAction => ({
  type: 'SET_PRODUCTS',
  payload: { products, totalPages },
})
