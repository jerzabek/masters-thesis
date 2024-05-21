'use client'

import { Close, Filter, ShoppingCartClear } from '@carbon/icons-react'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'

import { getProducts } from 'api/Product/repository'
import Pagination from 'components/Pagination'
import { ProductSlot } from 'components/Product'
import { Product } from 'model/Product'
import { ProductsProvider, useProductsDispatch, useProductsState } from 'modules/Products/List/context'
import { searchProducts, setCurrentPage, setProducts } from 'modules/Products/List/reducer/actions'

import { Filters, Sort } from './components'

interface Props {
  products: Product[]
  totalPages: number
}

function ProductList() {
  const isFirstLoad = useRef(true)

  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string | undefined>('')

  const { products, currentPage, totalPages, size, sort, filters, search } = useProductsState()
  const dispatch = useProductsDispatch()

  const { isOpen: areFiltersOpen, onOpen: openFilters, onClose: onFiltersClose } = useDisclosure()

  const breadcrumbBarBg = useColorModeValue('yellow.200', 'orange.700')

  const debouncedSearchProducts = useCallback(
    debounce((query: string) => dispatch(searchProducts(query)), 300),
    [dispatch]
  )

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    setIsLoading(true)

    getProducts({ page: currentPage - 1, size, sort, min: filters.min, max: filters.max, search })
      .then(({ products, totalPages }) => dispatch(setProducts(products, totalPages)))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [dispatch, currentPage, size, sort, filters, search])

  const handlePageChange = (page: number) => dispatch(setCurrentPage(page))
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)

    debouncedSearchProducts.cancel()
    debouncedSearchProducts(e.target.value)
  }
  const clearSearchQuery = () => {
    if (!searchQuery) return

    setSearchQuery(undefined)
    dispatch(searchProducts(undefined))
  }

  return (
    <>
      <Flex h="70px" bg={breadcrumbBarBg} align="center">
        <Container maxW="container.xl" py={16}>
          <Flex align="center" justify="space-between">
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

            <Box>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  placeholder="Search products..."
                  variant="filled"
                  value={searchQuery ?? ''}
                  onChange={handleSearchQueryChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" variant="ghost" onClick={clearSearchQuery}>
                    <Close width={24} height={24} />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
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
          ) : products.length ? (
            <Flex gap={6} flexWrap="wrap" justify="space-between">
              {products.map(product => (
                <ProductSlot product={product} key={product.id} />
              ))}
            </Flex>
          ) : (
            <Flex align="center" justify="center" flexDirection="column">
              <Box opacity={0.6} mb={4}>
                <ShoppingCartClear width={56} height={56} />
              </Box>
              <Text>No produts found</Text>
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
