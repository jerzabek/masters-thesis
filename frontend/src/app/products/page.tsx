import { ChevronRight } from '@carbon/icons-react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import { Products } from 'modules/Products/List'
import { productCreateUrl } from 'utils/pages'

export default function Page() {
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
          <Text as="h1" textStyle="h1">
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

      <Products />
    </>
  )
}
