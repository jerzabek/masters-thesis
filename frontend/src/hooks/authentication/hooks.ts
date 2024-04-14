import { useContext } from 'react'
import { UserContext } from './context'

/**
 * @returns {Object} user - The user object
 * @returns {boolean} isAuthenticated - If this variable is true then user object is available in context
 * @returns {boolean} isUserLoading - Whether the user is loading
 */
export const useUser = () => {
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const isUserLoading = userContext.isLoading
  const isAuthenticated = typeof userContext.user !== 'undefined'

  return { user: userContext.user, isAuthenticated, isUserLoading }
}
