import { Product } from 'model/Product'

import { IProductsState } from '../interface'
import * as I from './interface'

/** Products */

export const setProducts = (products: Product[], totalPages: number): I.SetProductsAction => ({
  type: 'SET_PRODUCTS',
  payload: { products, totalPages },
})

/** Pagination */

export const setCurrentPage = (currentPage: number): I.SetCurrentPageAction => ({
  type: 'SET_CURRENT_PAGE',
  payload: currentPage,
})

/** Filters */

export const setFilters = (filters: IProductsState['filters']): I.SetFiltersAction => ({
  type: 'SET_FILTERS',
  payload: filters,
})

export const toggleSort = (): I.ToggleSortAction => ({
  type: 'TOGGLE_SORT',
  payload: undefined,
})

export const searchProducts = (search?: string): I.SearchProductAction => ({
  type: 'SEARCH_PRODUCT',
  payload: search,
})

export const setCategory = (categoryId?: number): I.SetCategoryAction => ({
  type: 'SET_CATEGORY',
  payload: categoryId,
})
