import { getMe } from 'api/repository'
import { User } from 'model/User'
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react'

interface IUserContext {
  user: User | undefined
}

const INITIAL_USER_CONTEXT_VALUE = { user: undefined }

export const UserContext = createContext<IUserContext>(INITIAL_USER_CONTEXT_VALUE)

export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    getMe()
      .then(response => {
        console.log('loaded user', response)
        //@ts-ignore
        setCurrentUser(response)
      })
      .catch(() => console.log('Not authenticated'))
  }, [])

  return <UserContext.Provider value={{ user: currentUser }}>{children}</UserContext.Provider>
}
