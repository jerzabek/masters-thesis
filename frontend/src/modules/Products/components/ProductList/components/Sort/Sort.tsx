import { ChevronDown, ChevronUp } from '@carbon/icons-react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useProductsDispatch, useProductsState } from 'modules/Products/context'
import { toggleSort } from 'modules/Products/reducer/actions'

export default function Sort() {
  const { sort } = useProductsState()

  const dispatch = useProductsDispatch()

  const handleSwitchSort = () => {
    dispatch(toggleSort())
  }

  return (
    <Flex align="center">
      <Text fontWeight="bold" mr={2}>
        Sort:
      </Text>

      <Flex align="center" _hover={{ cursor: 'pointer' }} onClick={handleSwitchSort} w="130px" justify="center">
        {sort === 'asc' ? (
          <>
            Ascending
            <Box ml={2}>
              <ChevronUp />
            </Box>
          </>
        ) : (
          <>
            Descending
            <Box ml={2}>
              <ChevronDown />
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  )
}
