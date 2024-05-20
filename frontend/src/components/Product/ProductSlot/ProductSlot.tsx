import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'

import { image } from 'api/routes'
import { Product } from 'model/Product'
import { productPageUrl } from 'utils/pages'

import { ProductImage } from './style'

export default function ProductSlot({ product }: { product: Product }) {
  const bottomBoxBg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Link href={productPageUrl(product.id, product.slug)}>
      <Box
        _hover={{ cursor: 'pointer' }}
        border="1px solid"
        borderColor="blackAlpha.400"
        borderRadius={4}
        overflow="hidden"
      >
        <Box w={285} h={285} bg="gray.200" overflow="hidden">
          <ProductImage
            src={image(product.thumbnail) ?? image('noimage.png')!}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
          />
        </Box>

        <Box w={285} h={130} p={4} bg={bottomBoxBg}>
          <Box fontSize="lg" fontWeight="semibold">
            {product.name}
          </Box>

          <Text fontSize="md" opacity={0.8} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" mb={6}>
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
