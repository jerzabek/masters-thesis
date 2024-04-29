import { Product } from 'model/Product'
import { SetCurrentPageAction, SetProductsAction } from './interface'

/** Products */

export const setProducts = (products: Product[], totalPages: number): SetProductsAction => ({
  type: 'SET_PRODUCTS',
  payload: { products, totalPages },
})

/** Pagination */

export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({
  type: 'SET_CURRENT_PAGE',
  payload: currentPage,
})
