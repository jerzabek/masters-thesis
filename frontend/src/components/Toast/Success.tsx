import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useSuccessToast = () => {
  const toast = useToast()

  const showToast = useCallback((title = 'Saved successfully!') => {
    return toast({
      title,
      status: 'success',
      position: 'bottom-right',
    })
  }, [])

  return showToast
}
