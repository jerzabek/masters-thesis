'use client'

import { ChevronRight } from '@carbon/icons-react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { image } from 'api/routes'
import NumberInput from 'components/NumberInput'
import { Product } from 'model/Product'
import Image from 'next/image'
import { categoryPageUrl, productPageUrl } from 'utils/pages'

interface Props {
  product: Product
}

export default function ProductPage({ product }: Props) {
  const breadcrumbBarBg = useColorModeValue('yellow.200', 'orange.700')

  return (
    <>
      <Flex h="70px" bg={breadcrumbBarBg} align="center">
        <Container maxW="container.xl" py={16}>
          <Breadcrumb spacing="8px" separator={<ChevronRight color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pinehaus</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={categoryPageUrl(product.category.id, product.category.name)}>
                {product.category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={productPageUrl(product.id, product.slug)}>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </Flex>

      <Container maxW="container.xl" py={16}>
        <Flex justify="space-between" align="flex-start">
          <Box border="1px solid" borderColor="gray.300" borderRadius={4}>
            <Image src={product.thumbnail ?? image('noimage.png')} alt={product.name} width={500} height={500} />
          </Box>

          <Box w="600px">
            <Text fontSize={42}>{product.name}</Text>
            <Text fontSize={24} opacity={0.7} mb={2}>
              {product.price} &euro;
            </Text>

            <Divider mb={4} />

            <Box minH="140px" mb={4}>
              <Text>{product.description}</Text>
            </Box>

            <Divider mb={4} />

            <Flex gap={8}>
              <NumberInput inputProps={{ placeholder: 'Quantity', w: '70px' }} />

              <Button variant="outline" size="lg">
                Add to cart
              </Button>
            </Flex>

            <Divider my={4} />

            <Text fontSize={18} mb={4}>
              Details:
            </Text>

            {product.attributes.map(({ attribute, value }) => (
              <Flex key={attribute.id} mb={4}>
                <Box w="160px" opacity={0.7}>
                  <Text>{attribute.name}</Text>
                </Box>

                <Text mx={4} opacity={0.7}>
                  :
                </Text>

                <Text opacity={0.7}>{value}</Text>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Container>
    </>
  )
}
