import { Product } from 'model/Product'
import { Action } from 'utils/interface'

export type SetProductsAction = Action<
  'SET_PRODUCTS',
  {
    products: Product[]
    totalPages: number
  }
>

export type SetCurrentPageAction = Action<'SET_CURRENT_PAGE', number>

export type ProductsActions = SetProductsAction | SetCurrentPageAction
