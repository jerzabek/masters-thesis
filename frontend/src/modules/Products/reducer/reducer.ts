import { IProductsState } from '../interface'
import { ProductsActions } from './interface'

export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export const reducer = (state: IProductsState, action: ProductsActions): IProductsState => {
  switch (action.type) {
    case SET_PRODUCTS: {
      const { products, totalPages } = action.payload

      return {
        ...state,
        products,
        totalPages,
      }
    }

    case SET_CURRENT_PAGE: {
      const currentPage = action.payload

      return {
        ...state,
        currentPage,
      }
    }

    default:
      return state
  }
}
