'use client'

import { Box, Button, Container, Flex, Spinner, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getProduct } from 'api/Product/repository'
import { purchaseCart } from 'api/Purchase/repository'
import { useCart } from 'components/Cart'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'
import { Product } from 'model/Product'
import { Error } from 'utils/api/interface'

import { ItemList } from './components'

export default function CartPage() {
  const { isCartLoaded } = useCart()

  const background = useColorModeValue('yellow.200', 'orange.700')

  const { cart, clearCart } = useCart()

  const { close } = useToast()

  const { push } = useRouter()

  const showSavingToast = useSavingToast()
  const showSuccessToast = useSuccessToast()
  const showErrorToast = useErrorToast()

  const [products, setProducts] = useState<Record<number, Product>>()
  const [isLoading, setIsLoading] = useState(true)

  const [total, setTotal] = useState(0)

  useEffect(() => {
    Promise.all(cart.items.map(item => getProduct(item.product)))
      .then(_products => {
        if (!_products.length) return

        const productRecord: Record<number, Product> = {}

        _products.forEach(product => {
          productRecord[product.id] = product
        })

        setProducts(productRecord)

        const total = cart.items.reduce((acc, item) => {
          const product = productRecord[item.product]

          return acc + product.price * item.quantity
        }, 0)

        setTotal(total)
      })
      .finally(() => setIsLoading(false))
  }, [cart])

  const handleCheckout = () => {
    const toastId = showSavingToast()

    purchaseCart(cart.items)
      .then(() => {
        showSuccessToast()
        clearCart()

        push(`/profile`)
      })
      .catch((e: Error) => {
        showErrorToast({ description: e.message })
      })
      .finally(() => close(toastId))
  }

  if (!isCartLoaded || isLoading) {
    return (
      <Flex justify="center" align="center" p={12}>
        <Spinner />
      </Flex>
    )
  }

  const isEmpty = !cart.items.length

  return (
    <>
      <Container maxW="container.xl" py={16}>
        <Flex
          flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'column-reverse', 'row']}
          align={['stretch', 'stretch', 'stretch', 'stretch', 'flex-start']}
          gap={6}
        >
          <Box flex={3}>
            <ItemList products={products} />
          </Box>

          <Flex
            flex={1}
            py={4}
            px={14}
            w="100%"
            bg={background}
            borderRadius={4}
            justify="center"
            align="center"
            flexDirection="column"
          >
            <Text textStyle="h2" mb={6} as="div" fontWeight="bold">
              Cart Total
            </Text>

            <Flex
              justify="space-between"
              mb={10}
              w="100%"
              maxW="300px"
              borderBottom="1px solid"
              borderBottomColor="blackAlpha.300"
            >
              <Text>Total</Text>
              <Text flex={1} textAlign="end">
                &euro; {total.toFixed(2)}
              </Text>
            </Flex>

            <Button variant="outline" colorScheme="green" onClick={handleCheckout} isDisabled={isEmpty}>
              Proceed to checkout
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
