'use client'

import { ChevronRight, Filter } from '@carbon/icons-react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { getProducts } from 'api/Product/repository'
import Pagination from 'components/Pagination'
import { ProductSlot } from 'components/Product'
import { Product } from 'model/Product'
import { ProductsProvider, useProductsDispatch, useProductsState } from 'modules/Products/context'
import { setCurrentPage, setProducts } from 'modules/Products/reducer/actions'
import { useEffect, useRef } from 'react'
import { Filters } from './components'

interface Props {
  products: Product[]
  totalPages: number
}

function ProductList({}: Props) {
  const isFirstLoad = useRef(true)

  const { products, currentPage, totalPages, size, sort, filters } = useProductsState()
  const dispatch = useProductsDispatch()

  const { isOpen: areFiltersOpen, onOpen: openFilters, onClose: onFiltersClose } = useDisclosure()

  const breadcrumbBarBg = useColorModeValue('yellow.200', 'orange.700')

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    getProducts({ page: currentPage - 1, size, sort, min: filters.min, max: filters.max })
      .then(({ products, totalPages }) => dispatch(setProducts(products, totalPages)))
      .catch(console.error)
  }, [currentPage, size, sort, filters])

  const handlePageChange = (page: number) => dispatch(setCurrentPage(page))

  return (
    <>
      <Flex h="70px" bg={breadcrumbBarBg} align="center">
        <Container maxW="container.xl" py={16}>
          <Button variant="ghost" onClick={openFilters}>
            <Box mr={2}>
              <Filter />
            </Box>
            Filter
          </Button>
        </Container>
      </Flex>

      <Filters isOpen={areFiltersOpen} onClose={onFiltersClose} />

      <Container maxW="container.xl" py={16}>
        <Flex flexDirection="column" align="center">
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} mb={8} />

          <Flex gap={6} flexWrap="wrap">
            {products.map(product => (
              <ProductSlot product={product} key={product.id} />
            ))}
          </Flex>

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
