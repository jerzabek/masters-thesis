import { ChevronRight } from '@carbon/icons-react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

export default function page() {
  return (
    <>
      <Box w="100%" h="350px" position="relative">
        <Image
          src="/images/banners/products-banner.jpg"
          alt="Product page banner"
          objectFit="cover"
          objectPosition="center"
          sizes="100vw"
          style={{
            opacity: 0.3,
            zIndex: -1,
          }}
          fill
        />

        <Flex flexDir="column" justify="center" align="center" h="100%">
          <Text as="h1" textStyle="h1" color="black">
            Explore our products
          </Text>

          <Breadcrumb spacing="8px" separator={<ChevronRight color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pinehaus</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
    </>
  )
}
