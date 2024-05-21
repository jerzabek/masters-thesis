import { ChevronRight } from '@carbon/icons-react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import { getProducts } from 'api/Product/repository'
import { productCreateUrl } from 'utils/pages'

import { ProductList } from './components'
import { INITIAL_PRODUCTS_STATE } from './const'

export default async function Products({ categoryId }: { categoryId?: number }) {
  let products

  try {
    products = await getProducts({ size: INITIAL_PRODUCTS_STATE.size, sort: INITIAL_PRODUCTS_STATE.sort, categoryId })
  } catch (e) {
    console.error(e)
    return null
  }

  return (
    <>
      <Box w="100%" h="350px" position="relative">
        <Image
          src="/images/banners/products-banner.jpg"
          alt="Product page banner"
          sizes="100vw"
          style={{
            opacity: 0.3,
            zIndex: -1,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          fill
        />

        <Flex flexDir="column" justify="center" align="center" h="100%">
          <Text as="h1" textStyle="h1" textAlign="center">
            Explore our products
          </Text>

          <Breadcrumb spacing="8px" separator={<ChevronRight color="gray.500" />} mb={2}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pinehaus</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Button colorScheme="green" size="lg" as={Link} href={productCreateUrl()}>
            Publish your own product
          </Button>
        </Flex>
      </Box>

      <ProductList products={products.products} totalPages={products.totalPages} categoryId={categoryId} />
    </>
  )
}
