'use client'

import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { getProductRecommendations } from 'api/Product/repository'
import { Product } from 'model/Product'

import { ProductSection } from './components'

export default function Home() {
  const [products, setProducts] = useState<Record<string, Product[]>>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProductRecommendations()
      .then(setProducts)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading || !products)
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    )

  return (
    <>
      <Text textStyle="h2" mb={6} textAlign="center">
        Check out some highlighted products for you
      </Text>

      {Object.entries(products).map(([category, products]) => (
        <Box key={category} mb={6} borderBottom="1px solid" borderBottomColor="blackAlpha.400">
          <ProductSection title={category} products={products} />
        </Box>
      ))}
    </>
  )
}
