import { ChakraProvider } from '@chakra-ui/react'
import { StyledComponentsRegistry } from 'utils/ui/StyledComponentRegistry'
import 'styles/global/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ChakraProvider>
      </body>
    </html>
  )
}
