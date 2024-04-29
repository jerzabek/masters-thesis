import { Product } from 'model/Product'
import { SetCurrentPageAction, SetFiltersAction, SetProductsAction } from './interface'
import { IProductsState } from '../interface'

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

/** Filters */

export const setFilters = (filters: IProductsState['filters']): SetFiltersAction => ({
  type: 'SET_FILTERS',
  payload: filters,
})
