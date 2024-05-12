import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useSavingToast = () => {
  const toast = useToast()

  const showToast = useCallback(() => {
    return toast({
      title: 'Saving...',
      status: 'loading',
      position: 'bottom-right',
    })
  }, [])

  return showToast
}
