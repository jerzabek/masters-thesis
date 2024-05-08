'use client'

import { Product } from 'model/Product'
import { ProductForm } from './components'
import { Container } from '@chakra-ui/react'

interface Props {
  product: Product
}

export default function ProductEditPage({ product }: Props) {
  return (
    <>
      <Container maxW="container.xl" py={16}>
        <ProductForm product={product} handleSubmit={() => {}} w="100%" />
      </Container>
    </>
  )
}
