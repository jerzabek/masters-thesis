'use client'

import { Flex } from '@chakra-ui/react'
import { ProductSlot } from 'components/Product'
import { Product } from 'model/Product'
import { ProductsProvider } from 'modules/Products/context'

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <ProductsProvider products={products}>
      <Flex gap={4} flexWrap="wrap">
        {products.map(product => (
          <ProductSlot product={product} key={product.id} />
        ))}
      </Flex>
    </ProductsProvider>
  )
}
