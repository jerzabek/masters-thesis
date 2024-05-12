import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useSuccessToast = () => {
  const toast = useToast()

  const showToast = useCallback(() => {
    return toast({
      title: 'Saved successfully!',
      status: 'success',
      position: 'bottom-right',
    })
  }, [])

  return showToast
}
