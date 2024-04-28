import { IProductsState } from '../interface'
import { ProductsActions } from './interface'

export const SET_PRODUCTS = 'SET_PRODUCTS'

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

    default:
      return state
  }
}
