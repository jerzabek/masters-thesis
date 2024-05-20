import { getProducts } from 'api/Product/repository'

import { ProductList } from './components'
import { INITIAL_PRODUCTS_STATE } from './const'

export default async function Products() {
  let products

  try {
    products = await getProducts({ size: INITIAL_PRODUCTS_STATE.size, sort: INITIAL_PRODUCTS_STATE.sort })
  } catch (e) {
    console.error(e)
    return null
  }

  return (
    <>
      <ProductList products={products.products} totalPages={products.totalPages} />
    </>
  )
}
