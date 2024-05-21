'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from 'hooks/authentication'
import { PropsWithChildren } from 'react'

import CartContextProvider from 'components/Cart/Cart'
import theme from 'styles/global/theme'
import { StyledComponentsRegistry } from 'utils/ui/StyledComponentRegistry'

export default function Providers({ children }: PropsWithChildren<object>) {
  return (
    <ChakraProvider theme={theme}>
      <StyledComponentsRegistry>
        <CartContextProvider>
          <UserProvider>{children}</UserProvider>
        </CartContextProvider>
      </StyledComponentsRegistry>
    </ChakraProvider>
  )
}
