'use client'

import { ChevronRight, Edit, Store, TrashCan } from '@carbon/icons-react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { deleteProduct } from 'api/Product/repository'
import { image } from 'api/routes'
import { useCart } from 'components/Cart'
import NumberInput from 'components/NumberInput'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'
import { Product } from 'model/Product'
import { ProductAttributeType } from 'model/Product/ProductAttribute'
import { categoryPageUrl, productEditUrl, productPageUrl } from 'utils/pages'

import { areAllProductOptionsSelected } from './utils'

interface Props {
  product: Product
}

export default function ProductPage({ product }: Props) {
  const { user } = useUser()
  const { addItem } = useCart()

  const router = useRouter()

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string | undefined>>({})

  const { close } = useToast()

  const showSuccessToast = useSuccessToast()
  const showErrorToast = useErrorToast()
  const showSavingToast = useSavingToast()

  const handleDeleteClick = () => setDeleteModalOpen(true)

  const handleDeleteConfirm = () => {
    const toastId = showSavingToast('Deleting...')

    deleteProduct(product.id)
      .then(() => {
        showSuccessToast('Product deleted!')
        router.push('/products')
      })
      .catch(() => {
        showErrorToast()
      })
      .finally(() => {
        setDeleteModalOpen(false)
        close(toastId)
      })
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
  }

  const handleAddToCart = () => {
    addItem(product.id, 1, selectedOptions)
  }

  const breadcrumbBarBg = useColorModeValue('yellow.200', 'orange.700')

  const hasAttributesWithOptions = product.attributes.some(
    ({ attribute }) => !!attribute.options && attribute.options.length > 0
  )
  const areAllOptionsSelected = areAllProductOptionsSelected(product, selectedOptions)
  const isOutOfStock = product.quantity <= 0
  const isLowStock = !isOutOfStock && product.quantity < 5

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
        <Flex
          justify="space-between"
          align={['flex-start', 'flex-start', 'flex-start', 'stretch']}
          flexDirection={['column', 'column', 'column', 'row']}
          gap={2}
        >
          <Flex justify={['center', 'center', 'center', 'flex-start']} align="flex-start" w="100%">
            <Box border="1px solid" borderColor="gray.300" borderRadius={4}>
              <Image
                src={image(product.thumbnail) ?? image('noimage.png')!}
                alt={product.name}
                width={500}
                height={500}
              />
            </Box>
          </Flex>

          <Box w={['100%', '100%', '100%', '90%']}>
            <Flex
              justify="space-between"
              align="start"
              gap={2}
              flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']}
            >
              <Text fontSize={42}>{product.name}</Text>

              {product.createdBy.id === user?.id && (
                <Flex gap={2} mt={4}>
                  <Button
                    variant="outline"
                    size="sm"
                    colorScheme="green"
                    as={Link}
                    href={productEditUrl(product.id, product.slug)}
                  >
                    <Flex align="center" gap={2}>
                      <Edit /> Edit
                    </Flex>
                  </Button>

                  <Button variant="outline" size="sm" colorScheme="red" onClick={handleDeleteClick}>
                    <Flex align="center" gap={2}>
                      <TrashCan /> Delete
                    </Flex>
                  </Button>
                </Flex>
              )}
            </Flex>
            <Flex align="center" justify="space-between">
              <Text fontSize={24} opacity={0.8} mb={2}>
                {product.price} &euro;
              </Text>
              <Text fontSize={14} opacity={0.8} as={Flex} align="center" gap={2}>
                <Store width={24} height={24} /> Sold by:{' '}
                <Text as="span" fontWeight="bold">
                  {product.createdBy.username ?? 'Unknown'}
                </Text>
              </Text>
            </Flex>
            <Divider mb={4} />
            <Box minH="140px" mb={4}>
              <Text>{product.description}</Text>
            </Box>

            <Divider my={4} />

            {hasAttributesWithOptions && (
              <Box mb={8}>
                <Text fontSize={18} mb={4}>
                  Select options:
                </Text>

                {product.attributes
                  .filter(({ attribute }) => attribute.type === ProductAttributeType.ENUM)
                  .map(({ attribute, value }) => {
                    let attributeOptions = value.split(',')

                    if (!attributeOptions.length) attributeOptions = attribute.options as string[]

                    return (
                      <Box key={attribute.id} mb={4}>
                        <Text opacity={0.7}>{attribute.name}</Text>

                        <Flex>
                          {attributeOptions.map(option => {
                            const isSelected = selectedOptions[attribute.id] === option

                            const handleSelectAttributeValue = (option: string) => () => {
                              setSelectedOptions({
                                ...selectedOptions,
                                [attribute.id]: isSelected ? undefined : option,
                              })
                            }

                            return (
                              <Button
                                key={option}
                                variant={isSelected ? 'solid' : 'outline'}
                                size="sm"
                                mr={4}
                                colorScheme={isSelected ? 'green' : 'gray'}
                                onClick={handleSelectAttributeValue(option)}
                              >
                                {option}
                              </Button>
                            )
                          })}
                        </Flex>
                      </Box>
                    )
                  })}
              </Box>
            )}
            <Flex gap={8} align="flex-start">
              <NumberInput inputProps={{ placeholder: 'Quantity', w: '70px' }} />

              <Flex flexDirection="column" gap={2}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToCart}
                  isDisabled={!areAllOptionsSelected || isOutOfStock}
                >
                  Add to cart
                </Button>

                {isLowStock ? (
                  <Text fontSize={14} color="red.500">
                    Less that 5 left in stock!
                  </Text>
                ) : (
                  isOutOfStock && (
                    <Text fontSize={14} color="red.500">
                      Out of stock
                    </Text>
                  )
                )}
              </Flex>
            </Flex>
            <Divider my={4} />
            <Text fontSize={18} mb={4}>
              Details:
            </Text>
            {product.attributes
              .filter(({ attribute }) => attribute.type !== ProductAttributeType.ENUM)
              .map(({ attribute, value }) => (
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

      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {product.name}?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this product?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteConfirm}>
              Delete
            </Button>
            <Button variant="ghost" onClick={handleDeleteCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
