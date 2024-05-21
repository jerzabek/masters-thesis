import { createContext, useContext, useReducer } from 'react'

import { Product } from 'model/Product'

import { INITIAL_PRODUCTS_STATE } from './const'
import { IProductsState } from './interface'
import { ProductsActions } from './reducer/interface'
import { reducer } from './reducer/reducer'

interface IProductsContext {
  state: IProductsState
  dispatch: React.Dispatch<ProductsActions>
}

const ProductsContext = createContext<IProductsContext>({} as IProductsContext)

interface ProviderProps {
  products: Product[]
  totalPages: number
  categoryId?: number
}

export const ProductsProvider = ({
  children,
  products,
  totalPages,
  categoryId,
}: React.PropsWithChildren<ProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_PRODUCTS_STATE,
    products,
    totalPages,
    categoryId,
  } as IProductsState)

  return <ProductsContext.Provider value={{ state, dispatch }}>{children}</ProductsContext.Provider>
}

export const useProductsState = () => {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context.state
}

export const useProductsDispatch = () => {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context.dispatch
}
