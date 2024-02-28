import { ChakraProvider } from '@chakra-ui/react'
import { StyledComponentsRegistry } from 'shared/ui/StyledComponentRegistry'
import 'app/(styles)/globals.css'

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
