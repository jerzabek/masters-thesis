import { Product } from 'model/Product'
import { Action } from 'utils/interface'

import { IProductsState } from '../interface'

export type SetProductsAction = Action<
  'SET_PRODUCTS',
  {
    products: Product[]
    totalPages: number
  }
>

export type SetCurrentPageAction = Action<'SET_CURRENT_PAGE', number>

export type SetFiltersAction = Action<'SET_FILTERS', IProductsState['filters']>

export type ToggleSortAction = Action<'TOGGLE_SORT', undefined>

export type SearchProductAction = Action<'SEARCH_PRODUCT', string | undefined>

export type ProductsActions =
  | SetProductsAction
  | SetCurrentPageAction
  | SetFiltersAction
  | ToggleSortAction
  | SearchProductAction
