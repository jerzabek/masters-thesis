import { Close } from '@carbon/icons-react'
import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Image from 'next/image'

import { image } from 'api/routes'
import { useCart } from 'components/Cart'
import { Product } from 'model/Product'

interface Props {
  products?: Record<number, Product>
}

export default function CartPage({ products }: Props) {
  const { cart, removeItem } = useCart()

  const isLoading = typeof products === 'undefined'
  const hasItems = cart.items.length > 0

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>{/* Product thumbnail */}</Th>
              <Th>Product</Th>
              <Th>Details</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Subtotal</Th>
              <Th>{/* Remove from cart button */}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!isLoading && hasItems ? (
              cart.items.map(item => {
                const product = products[item.product]

                const productOptionAttributes = product.attributes.filter(
                  ({ attribute }) => !!attribute.options && attribute.options.length > 0
                )

                return (
                  <Tr key={item.product}>
                    <Td w={120}>
                      <Box w={120}>
                        <Image
                          src={image(product.thumbnail) ?? image('noimage.png')!}
                          alt={product.name}
                          width={120}
                          height={120}
                        />
                      </Box>
                    </Td>
                    <Td>
                      <Text w={150} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" title={product.name}>
                        {product.name}
                      </Text>
                    </Td>
                    <Td w={200}>
                      <Flex flexWrap="wrap" gap={4}>
                        {productOptionAttributes.length ? (
                          productOptionAttributes.map(({ attribute }) => {
                            const attributeValue = item.attributes[attribute.id]

                            return (
                              <Flex flexDirection="column" py={2} key={attribute.id}>
                                <Text fontSize={11} opacity={0.8}>
                                  {attribute.name}
                                </Text>
                                <Text fontWeight="bold" as="span">
                                  {attributeValue ?? 'Invalid value'}
                                </Text>
                              </Flex>
                            )
                          })
                        ) : (
                          <Text fontSize={11} opacity={0.8}>
                            No options
                          </Text>
                        )}
                      </Flex>
                    </Td>
                    <Td textAlign="end">{item.quantity}</Td>
                    <Td>
                      <Flex flexDirection="column" textAlign="end">
                        <Text fontSize={16}>&euro; {item.quantity * product.price}</Text>
                        {item.quantity > 1 && (
                          <Text opacity={0.8}>
                            {item.quantity}x {product.price}
                          </Text>
                        )}
                      </Flex>
                    </Td>
                    <Td>
                      <Button onClick={() => removeItem(item.product)} colorScheme="red" size="sm" variant="outline">
                        <Close />
                      </Button>
                    </Td>
                  </Tr>
                )
              })
            ) : !hasItems ? (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  <Text opacity={0.8}>Your cart is empty</Text>
                </Td>
              </Tr>
            ) : null}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
