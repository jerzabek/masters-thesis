import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ProductAttribute } from 'model/Product'
import { ProductAttributeType } from 'model/Product/ProductAttribute'

interface Props {
  isOpen: boolean
  onClose: () => void
  attributes: ProductAttribute[]
  submit: (attribute: ProductAttribute, value: string) => void
  attribute?: ProductAttribute
}

export default function EditAttributeModal({ attributes, attribute, isOpen, submit, onClose }: Props) {
  const [selectedAttribute, setSelectedAttribute] = useState<ProductAttribute | undefined>(attribute)
  const [attributeValue, setAttributeValue] = useState(attribute?.value ?? '')
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setSelectedAttribute(attribute)
    setAttributeValue(attribute?.value ?? '')
  }, [attribute, isOpen])

  useEffect(() => {
    setIsValid(!!selectedAttribute && !!attributeValue.trim())
  }, [selectedAttribute, attributeValue])

  useEffect(() => {
    setAttributeValue('')
  }, [selectedAttribute])

  const handleSelectedAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedAttribute(attributes.find(attribute => attribute.id === +e.target.value))

  const handleAttributeValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setAttributeValue(e.target.value)

  const toggleCheckboxValue = () => {
    setAttributeValue(attributeValue === 'true' ? 'false' : 'true')
  }

  const handleSubmit = () => {
    if (!selectedAttribute) return

    submit(selectedAttribute, attributeValue)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editing attribute</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Flex gap={4}>
            <Box flex={2}>
              <FormControl isRequired>
                <FormLabel>Attribute</FormLabel>
                <Select placeholder="Attribute" value={selectedAttribute?.id} onChange={handleSelectedAttributeChange}>
                  {attributes.map(attribute => (
                    <option key={attribute.id} value={attribute.id}>
                      {attribute.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box flex={3}>
              {typeof selectedAttribute !== 'undefined' && (
                <>
                  {selectedAttribute.type === ProductAttributeType.ENUM ? (
                    <FormControl isRequired>
                      <FormLabel>Value</FormLabel>
                      <Select
                        placeholder="Select an option..."
                        value={selectedAttribute.value}
                        onChange={handleAttributeValueChange}
                      >
                        {selectedAttribute.options.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>

                      {!isValid && <FormErrorMessage>You must define an attribute value</FormErrorMessage>}
                    </FormControl>
                  ) : selectedAttribute.type === ProductAttributeType.BOOLEAN ? (
                    <FormControl>
                      <Checkbox checked={attributeValue === 'true'} mt={9} onChange={toggleCheckboxValue}>
                        Value
                      </Checkbox>
                    </FormControl>
                  ) : selectedAttribute.type === ProductAttributeType.NUMBER ? (
                    <FormControl flex={1} isRequired>
                      <FormLabel>Value</FormLabel>
                      <NumberInput isRequired value={attributeValue} onChange={setAttributeValue}>
                        <NumberInputField />
                      </NumberInput>
                      {!isValid && <FormErrorMessage>You must define an attribute value</FormErrorMessage>}
                    </FormControl>
                  ) : (
                    <FormControl flex={2} isRequired isInvalid={!isValid}>
                      <FormLabel>Value</FormLabel>
                      <Input isRequired value={attributeValue} onChange={handleAttributeValueChange} />
                      {!isValid && <FormErrorMessage>You must define an attribute value</FormErrorMessage>}
                    </FormControl>
                  )}
                </>
              )}
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button colorScheme="green" isDisabled={!isValid} onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
