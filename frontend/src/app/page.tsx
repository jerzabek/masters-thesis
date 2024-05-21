import { ChevronRight } from '@carbon/icons-react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import Home from 'modules/Home'
import { productListPageUrl } from 'utils/pages'

export default function HomePage() {
  return (
    <>
      <Box w="100%" h="350px" position="relative">
        <Image
          src="/images/banners/home-banner.jpg"
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
            Welcome to Pinehaus
          </Text>

          <Breadcrumb spacing="8px" separator={<ChevronRight color="gray.500" />} mb={2}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pinehaus</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Button colorScheme="green" size="lg" as={Link} href={productListPageUrl()}>
            Explore our products
          </Button>
        </Flex>
      </Box>

      <Container maxW="container.xl" py={16}>
        <Home />
      </Container>
    </>
  )
}
