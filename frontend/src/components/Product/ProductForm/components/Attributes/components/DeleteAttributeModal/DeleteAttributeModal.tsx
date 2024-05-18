import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  message: string
  onSubmit: () => void
}

export default function DeleteAttributeModal({ isOpen, message, onClose, onSubmit }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button colorScheme="red" onClick={onSubmit}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
