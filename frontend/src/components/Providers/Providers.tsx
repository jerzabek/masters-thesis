'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from 'hooks/authentication'
import { PropsWithChildren } from 'react'
import { StyledComponentsRegistry } from 'utils/ui/StyledComponentRegistry'

export default function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ChakraProvider>
      <StyledComponentsRegistry>
        <UserProvider>{children}</UserProvider>
      </StyledComponentsRegistry>
    </ChakraProvider>
  )
}
