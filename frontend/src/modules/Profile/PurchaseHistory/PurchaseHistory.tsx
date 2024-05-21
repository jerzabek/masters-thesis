import { Store } from '@carbon/icons-react'
import { Text } from '@chakra-ui/layout'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getPurchaseHistory } from 'api/Purchase/repository'
import { image } from 'api/routes'
import { Purchase } from 'model/Purchase'
import { productPageUrl } from 'utils/pages'

export default function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState<Record<string, Purchase[]>>()

  useEffect(() => {
    getPurchaseHistory()
      .then(purchases => {
        const groupedPurchases = purchases.reduce(
          (acc, purchase) => {
            const date = new Date(purchase.timestamp).toLocaleDateString('hr', { dateStyle: 'short' })

            if (!acc[date]) acc[date] = []

            acc[date].push(purchase)

            return acc
          },
          {} as Record<string, Purchase[]>
        )

        setPurchaseHistory(groupedPurchases)
      })
      .catch(e => console.error('Failed to fetch purchase history', e))
  }, [])

  return (
    <>
      <Flex align="center" gap={4} mb={1}>
        <Store width={24} height={24} />

        <Text as="h2" textStyle="h2">
          Past purchases
        </Text>
      </Flex>

      <Divider mb={4} />

      {typeof purchaseHistory === 'undefined' ? (
        <Flex justify="center" align="center">
          <Spinner />
        </Flex>
      ) : !Object.keys(purchaseHistory).length ? (
        <Flex justify="center" align="center">
          <Text opacity={0.8}>You have&apos;t made any purchases yet.</Text>
        </Flex>
      ) : (
        Object.entries(purchaseHistory).map(([date, purchases]) => (
          <Box key={date} p={4} bg="gray.50" borderRadius={4} mb={4}>
            <Text opacity={0.8} fontSize={14} mb={2}>
              {date}
            </Text>
            <Accordion allowMultiple>
              {purchases.map(purchase => (
                <AccordionItem key={purchase.id}>
                  <h2>
                    <AccordionButton>
                      <Text>
                        Purchased {purchase.products.length} products at{' '}
                        {new Date(purchase.timestamp).toLocaleString('hr', {
                          timeStyle: 'short',
                        })}
                        .
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {purchase.products.map(item => {
                      return (
                        <Flex
                          key={item.id}
                          align="center"
                          gap={8}
                          mb={4}
                          borderBottom="1px solid"
                          borderBottomColor="blackAlpha.200"
                          flexDirection={['column', 'column', 'row']}
                          p={2}
                          as={Link}
                          href={productPageUrl(item.product.id, item.product.slug)}
                        >
                          <Box w={70}>
                            <Image
                              src={image(item.product.thumbnail) ?? image('noimage.png')!}
                              alt={item.productName}
                              width={70}
                              height={70}
                            />
                          </Box>

                          <Box w="200px" textAlign={['center', 'center', 'start']}>
                            <Text fontWeight="bold" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                              {item.productName}
                            </Text>
                            <Text fontSize={14} opacity={0.8}>
                              Quantity: {item.quantity}
                            </Text>
                          </Box>

                          <Flex flex={2} flexWrap="wrap" gap={4}>
                            {item.attributes.map(({ id, name, value }) => (
                              <Flex flexDirection="column" py={2} key={id}>
                                <Text fontSize={11} opacity={0.8}>
                                  {name}
                                </Text>
                                <Text fontWeight="bold" as="span">
                                  {value}
                                </Text>
                              </Flex>
                            ))}
                          </Flex>

                          <Flex flex={2} gap={4}>
                            <Box flex={1} textAlign={['center', 'center', 'end']}>
                              <Text fontSize={14} opacity={0.8}>
                                Subtotal
                              </Text>
                              <Text>&euro;{item.price.toFixed(2)}</Text>
                            </Box>

                            <Box flex={1} textAlign={['center', 'center', 'end']}>
                              <Text fontSize={14} opacity={0.8}>
                                Total
                              </Text>
                              <Text>&euro;{(item.price * item.quantity).toFixed(2)}</Text>
                            </Box>
                          </Flex>
                        </Flex>
                      )
                    })}

                    <Text fontWeight="bold" fontSize={18} textAlign="end">
                      Total price: &euro; {purchase.total.toFixed(2)}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        ))
      )}
    </>
  )
}
