'use client'

import { ChevronRight, Filter } from '@carbon/icons-react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { getProducts } from 'api/Product/repository'
import Pagination from 'components/Pagination'
import { ProductSlot } from 'components/Product'
import { Product } from 'model/Product'
import { ProductsProvider, useProductsDispatch, useProductsState } from 'modules/Products/List/context'
import { setCurrentPage, setProducts } from 'modules/Products/List/reducer/actions'
import { useEffect, useRef, useState } from 'react'
import { Filters, Sort } from './components'

interface Props {
  products: Product[]
  totalPages: number
}

function ProductList({}: Props) {
  const isFirstLoad = useRef(true)

  const [isLoading, setIsLoading] = useState(false)

  const { products, currentPage, totalPages, size, sort, filters } = useProductsState()
  const dispatch = useProductsDispatch()

  const { isOpen: areFiltersOpen, onOpen: openFilters, onClose: onFiltersClose } = useDisclosure()

  const breadcrumbBarBg = useColorModeValue('yellow.200', 'orange.700')

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    setIsLoading(true)

    getProducts({ page: currentPage - 1, size, sort, min: filters.min, max: filters.max })
      .then(({ products, totalPages }) => dispatch(setProducts(products, totalPages)))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [currentPage, size, sort, filters])

  const handlePageChange = (page: number) => dispatch(setCurrentPage(page))

  return (
    <>
      <Flex h="70px" bg={breadcrumbBarBg} align="center">
        <Container maxW="container.xl" py={16}>
          <Flex align="center" gap={4}>
            <Button variant="ghost" onClick={openFilters}>
              Filter
              <Box ml={2}>
                <Filter />
              </Box>
            </Button>

            <Divider orientation="vertical" h="30px" mr={2} borderColor="yellow.700" />

            <Sort />

            <Divider orientation="vertical" h="30px" mx={2} borderColor="yellow.700" />
          </Flex>
        </Container>
      </Flex>

      <Filters isOpen={areFiltersOpen} onClose={onFiltersClose} />

      <Container maxW="container.xl" py={16}>
        <Flex flexDirection="column" align="center">
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} mb={8} />

          {isLoading ? (
            <Flex align="center" justify="center" h="50vh">
              Loading...
            </Flex>
          ) : (
            <Flex gap={6} flexWrap="wrap">
              {products.map(product => (
                <ProductSlot product={product} key={product.id} />
              ))}
            </Flex>
          )}

          <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} mt={8} />
        </Flex>
      </Container>
    </>
  )
}

const withProvider = (Component: React.FC<Props>) => (props: Props) => (
  <ProductsProvider {...props}>
    <Component {...props} />
  </ProductsProvider>
)

const ProductListWithProvider = withProvider(ProductList)

export default ProductListWithProvider
