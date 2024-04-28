import { Box, Text } from '@chakra-ui/react'
import { image } from 'api/routes'
import { Product } from 'model/Product'
import Link from 'next/link'
import { productPage } from 'utils/pages'
import { ProductImage } from './style'
import { useProductsState } from 'modules/Products/context'

export default function ProductSlot({ product }: { product: Product }) {
  const { products } = useProductsState()

  return (
    <Link href={productPage(product.id, product.slug)}>
      <Box _hover={{ cursor: 'pointer' }} border="1px solid" borderColor="gray.100" borderRadius={4}>
        <Box w={285} h={285} bg="gray.200" overflow="hidden">
          <ProductImage
            src={product.thumbnail ?? image('noimage.png')}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
          />
        </Box>

        <Box w={285} h={160} p={4} bg="gray.50">
          <Box fontSize="lg" fontWeight="semibold">
            {product.name}
          </Box>

          <Text fontSize="md" color="gray.500" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {product.description}
          </Text>

          <Box fontSize="lg" fontWeight="semibold" mt={2}>
            &euro;{product.price}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
