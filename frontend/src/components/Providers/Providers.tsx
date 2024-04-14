'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from 'hooks/authentication'
import { PropsWithChildren } from 'react'
import theme from 'styles/global/theme'
import { StyledComponentsRegistry } from 'utils/ui/StyledComponentRegistry'

export default function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ChakraProvider theme={theme}>
      <StyledComponentsRegistry>
        <UserProvider>{children}</UserProvider>
      </StyledComponentsRegistry>
    </ChakraProvider>
  )
}
