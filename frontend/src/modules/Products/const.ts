import { IProductsState } from './interface'

export const PRODUCT_PAGE_SIZES = [5, 12, 20, 50]

const DEFAULT_PRODUCT_PAGE_SIZE = PRODUCT_PAGE_SIZES[1]

export const INITIAL_PRODUCTS_STATE: IProductsState = {
  currentPage: 1,
  filters: {},
  products: [],
  size: DEFAULT_PRODUCT_PAGE_SIZE,
  sort: 'asc',
  totalPages: 0,
}
