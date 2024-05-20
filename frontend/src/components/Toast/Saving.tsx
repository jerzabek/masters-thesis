import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useSavingToast = () => {
  const toast = useToast()

  const showToast = useCallback((title = 'Saving...') => {
    return toast({
      title,
      status: 'loading',
      position: 'bottom-right',
    })
  }, [])

  return showToast
}
