import { Add, Edit, TrashCan } from '@carbon/icons-react'
import {
  Box,
  Button,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

import { getAttributes } from 'api/Attribute/repository'
import { ProductAttribute } from 'model/Product'

import { ProductFormValues } from '../../interface'
import { DeleteAttributeModal, EditAttributeModal } from './components'

export default function Attributes() {
  const [attributes, setAttributes] = useState<ProductAttribute[]>()

  const { isOpen: isEditingOpen, onOpen: onEditingOpen, onClose: onEditingClose } = useDisclosure()
  const { isOpen: isDeletingOpen, onOpen: onDeletingOpen, onClose: onDeletingClose } = useDisclosure()
  const { isOpen: isCreatingOpen, onOpen: onCreatingOpen, onClose: onCreatingClose } = useDisclosure()

  const [editingAttribute, setEditingAttribute] = useState<ProductAttribute>()
  const [deletingAttribute, setDeletingAttribute] = useState<ProductAttribute>()

  const { values, setFieldValue } = useFormikContext<ProductFormValues>()

  useEffect(() => {
    getAttributes().then(setAttributes).catch(console.error)
  }, [])

  if (!attributes) {
    return <Spinner />
  }

  const toggleEditAttributeModal = (attribute: ProductAttribute) => () => {
    setEditingAttribute(attribute)
    onEditingOpen()
  }

  const toggleDeleteAttributeModal = (attribute: ProductAttribute) => () => {
    setDeletingAttribute(attribute)
    onDeletingOpen()
  }

  const handleAttributeUpdate = (attribute: ProductAttribute, value: string) => {
    if (editingAttribute === undefined) return

    const newAttributes = values.attributes.map(attr => {
      if (attr.attributeId === editingAttribute.id) {
        return { attributeId: attribute.id, value }
      }

      return attr
    })

    setFieldValue('attributes', newAttributes)
  }

  const handleAddAttribute = (attribute: ProductAttribute, value: string) => {
    const newAttributes = [...values.attributes, { attributeId: attribute.id, value }]

    setFieldValue('attributes', newAttributes)
  }

  const handleDeleteAttribute = () => {
    const newAttributes = values.attributes.filter(attr => attr.attributeId !== deletingAttribute?.id)

    setFieldValue('attributes', newAttributes)
    onDeletingClose()
  }

  return (
    <>
      <Text mb={2}>Product attributes</Text>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <Button variant="outline" colorScheme="green" size="sm" onClick={onCreatingOpen}>
              <Add width={24} height={24} style={{ marginRight: '8px' }} /> Add new attribute
            </Button>
          </TableCaption>
          <Thead>
            <Tr>
              <Th w="25%">Attribute</Th>
              <Th w="75%">Value</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {values.attributes.map(({ attributeId, value }, index) => {
              const attribute = attributes.find(attr => attr.id === attributeId)

              if (!attribute) {
                return (
                  <Tr key={index}>
                    <Td>Unknown Attribute ({attributeId})</Td>
                    <Td textOverflow="ellipsis">{value}</Td>
                    <Td></Td>
                  </Tr>
                )
              }

              attribute.value = value

              return (
                <Tr key={index}>
                  <Td>{attribute.name}</Td>
                  <Td>{value}</Td>
                  <Td>
                    <Box>
                      <Button
                        type="button"
                        variant="outline"
                        size="xs"
                        mr={2}
                        onClick={toggleEditAttributeModal(attribute)}
                      >
                        <Edit />
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        colorScheme="red"
                        size="xs"
                        onClick={toggleDeleteAttributeModal(attribute)}
                      >
                        <TrashCan />
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <EditAttributeModal
        isOpen={isEditingOpen}
        onClose={onEditingClose}
        attributes={attributes}
        attribute={editingAttribute}
        submit={handleAttributeUpdate}
      />

      <EditAttributeModal
        isOpen={isCreatingOpen}
        onClose={onCreatingClose}
        attributes={attributes}
        submit={handleAddAttribute}
      />

      <DeleteAttributeModal
        isOpen={isDeletingOpen}
        onClose={onDeletingClose}
        message={`Are you sure you wish to remove ${deletingAttribute?.name} from ${values.name}?`}
        onSubmit={handleDeleteAttribute}
      />
    </>
  )
}
