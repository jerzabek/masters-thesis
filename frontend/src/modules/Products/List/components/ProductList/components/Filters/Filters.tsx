import { CurrencyEuro } from '@carbon/icons-react'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useProductsDispatch, useProductsState } from 'modules/Products/List/context'
import { setFilters } from 'modules/Products/List/reducer/actions'
import { useEffect, useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Filters({ isOpen, onClose }: Props) {
  const { filters } = useProductsState()

  const [minError, setMinError] = useState(false)

  const [min, setMin] = useState(filters.min)
  const [max, setMax] = useState(filters.max)

  const dispatch = useProductsDispatch()

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMin(e.target.value ? Number(e.target.value) : undefined)
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMax(e.target.value ? Number(e.target.value) : undefined)

  const handleSubmit = () => {
    dispatch(setFilters({ min, max }))
    onClose()
  }

  useEffect(() => {
    setMin(filters.min)
    setMax(filters.max)
  }, [isOpen])

  useEffect(() => {
    if (min === undefined || max === undefined) {
      setMinError(false)
      return
    }

    setMinError(Number(min) > Number(max))
  }, [min, max])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Product filters</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Text mb={4} fontSize={14}>
              Specify product search filters:
            </Text>

            <Text>Price range:</Text>

            <Flex gap={4} align="baseline">
              <FormControl mb={2} isInvalid={minError}>
                <InputGroup as={Flex} flexDirection="column">
                  <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                    <CurrencyEuro />
                  </InputLeftElement>

                  <Input placeholder="Price above" type="number" value={min ?? ''} onChange={handleMinChange} />

                  {minError && <FormErrorMessage>Minimum price must be lower than maximum price</FormErrorMessage>}
                </InputGroup>
              </FormControl>
              -
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                    <CurrencyEuro />
                  </InputLeftElement>

                  <Input placeholder="Price bellow" type="number" value={max ?? ''} onChange={handleMaxChange} />
                </InputGroup>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit} isDisabled={minError}>
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
