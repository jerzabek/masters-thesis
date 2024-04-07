import { getMe } from 'api/repository'
import { User } from 'model/User'
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react'

interface IUserContext {
  isLoading: boolean
  user?: User
}

const INITIAL_USER_CONTEXT_VALUE: IUserContext = { user: undefined, isLoading: true }

export const UserContext = createContext<IUserContext>(INITIAL_USER_CONTEXT_VALUE)

export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then(setCurrentUser)
      .catch(() => setCurrentUser(undefined))
      .finally(() => setIsLoading(false))
  }, [])

  return <UserContext.Provider value={{ user: currentUser, isLoading }}>{children}</UserContext.Provider>
}
