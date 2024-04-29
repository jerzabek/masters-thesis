import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from './reducer/reducer'
import { IProductsState } from './interface'
import { ProductsActions } from './reducer/interface'
import { Product } from 'model/Product'
import { INITIAL_PRODUCTS_STATE } from './const'

interface IProductsContext {
  state: IProductsState
  dispatch: React.Dispatch<ProductsActions>
}

const ProductsContext = createContext<IProductsContext>({} as IProductsContext)

export const ProductsProvider = ({
  children,
  products,
  totalPages,
}: React.PropsWithChildren<{ products: Product[]; totalPages: number }>) => {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL_PRODUCTS_STATE, products, totalPages } as IProductsState)

  return <ProductsContext.Provider value={{ state, dispatch }}>{children}</ProductsContext.Provider>
}

export const useProductsState = () => {
  const context = React.useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context.state
}

export const useProductsDispatch = () => {
  const context = React.useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context.dispatch
}
