import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useErrorToast = () => {
  const toast = useToast()

  const showToast = useCallback(
    ({
      title = 'Something went wrong',
      description,
    }: {
      title?: string
      description?: string
    } = {}) => {
      console.log('Error toast:', title, description)
      return toast({
        title,
        description,
        status: 'error',
        position: 'bottom-right',
      })
    },
    []
  )

  return showToast
}
