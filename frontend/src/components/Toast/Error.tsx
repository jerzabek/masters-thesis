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
