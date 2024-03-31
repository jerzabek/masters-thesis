import { useContext } from 'react'
import { UserContext } from './context'

export const useUser = () => {
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return userContext.user
}
