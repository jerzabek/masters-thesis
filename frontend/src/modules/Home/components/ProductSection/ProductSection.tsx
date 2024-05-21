import { ShoppingCartClear } from '@carbon/icons-react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { ProductSlot } from 'components/Product'
import { Product } from 'model/Product'
import { productCreateUrl } from 'utils/pages'

interface Props {
  title: string
  products: Product[]
}

export default function ProductSection({ products, title }: Props) {
  const hasProducts = products.length > 0

  return (
    <>
      <Text textStyle="h2" fontWeight="bold" mb={2}>
        {title}
      </Text>

      <Flex gap={4} justify="space-around" flexWrap="wrap" p={4}>
        {hasProducts ? (
          products.map(product => <ProductSlot key={product.id} product={product} />)
        ) : (
          <Flex justify="center" align="center" flexDirection="column" gap={2}>
            <Box mb={4} opacity={0.6}>
              <ShoppingCartClear width={56} height={56} />
            </Box>
            <Text>We currently don&apos;t have products for {title}.</Text>
            <Text>
              Add your own by{' '}
              <Button variant="outline" as={Link} href={productCreateUrl()} colorScheme="green" size="sm">
                clicking here
              </Button>
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  )
}
