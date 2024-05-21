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
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { getCategories } from 'api/Category/repository'
import { getProducts } from 'api/Product/repository'
import Pagination from 'components/Pagination'
import { ProductSlot } from 'components/Product'
import { Category } from 'model/Category'
import { Product } from 'model/Product'
import { ProductsProvider, useProductsDispatch, useProductsState } from 'modules/Products/List/context'
import { searchProducts, setCategory, setCurrentPage, setProducts } from 'modules/Products/List/reducer/actions'
import { categoryPageUrl } from 'utils/pages'

import { Filters, Sort } from './components'

interface Props {
  products: Product[]
  totalPages: number
  categoryId?: number
}

function ProductList() {
  const isFirstLoad = useRef(true)

  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string | undefined>('')
  const [categories, setCategories] = useState<Category[]>()

  const { products, currentPage, totalPages, size, sort, filters, search, categoryId } = useProductsState()
  const dispatch = useProductsDispatch()

  const { push } = useRouter()

  const params = useParams<{ id: string; slug: string }>()

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

    getProducts({ page: currentPage - 1, size, sort, min: filters.min, max: filters.max, search, categoryId })
      .then(({ products, totalPages }) => dispatch(setProducts(products, totalPages)))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [dispatch, currentPage, size, sort, filters, search, categoryId])

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error)
  }, [])

  useEffect(() => {
    if (typeof categoryId === 'undefined' || typeof categories === 'undefined') return
    if (!Number(params.id)) return
    if (categoryId === Number(params.id)) return

    const categoryName = categories?.find(category => category.id === categoryId)?.name ?? 'category'

    push(categoryPageUrl(categoryId, categoryName))
  }, [categoryId, params.id, categories])

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
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _categoryId = e.target.value ? Number(e.target.value) : undefined

    dispatch(setCategory(_categoryId))
  }

  return (
    <>
      <Flex bg={breadcrumbBarBg} align="center">
        <Container maxW="container.xl" py={4}>
          <Flex align="center" justify="space-between" flexDirection={['column', 'column', 'row']} gap={4}>
            <Flex align="center" gap={4}>
              <Button variant="ghost" onClick={openFilters}>
                Filter
                <Box ml={2}>
                  <Filter />
                </Box>
              </Button>

              <Divider orientation="vertical" h="30px" mr={2} borderColor="yellow.700" />

              <Sort />
            </Flex>

            <Flex gap={4} flexDirection={['column', 'column', 'row']}>
              <Select
                placeholder="Select category"
                value={categoryId}
                onChange={handleCategoryChange}
                name="categoryId"
                variant="filled"
              >
                {!!categories?.length &&
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </Select>

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
            </Flex>
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
            <Flex gap={6} flexWrap="wrap" justify="space-around">
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
