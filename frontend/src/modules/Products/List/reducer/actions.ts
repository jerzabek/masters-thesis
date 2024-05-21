import { Product } from 'model/Product'

import { IProductsState } from '../interface'
import {
  SearchProductAction,
  SetCurrentPageAction,
  SetFiltersAction,
  SetProductsAction,
  ToggleSortAction,
} from './interface'

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

export const toggleSort = (): ToggleSortAction => ({
  type: 'TOGGLE_SORT',
  payload: undefined,
})

export const searchProducts = (search?: string): SearchProductAction => ({
  type: 'SEARCH_PRODUCT',
  payload: search,
})
