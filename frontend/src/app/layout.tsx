import { ChakraProvider } from '@chakra-ui/react'
import { StyledComponentsRegistry } from 'utils/ui/StyledComponentRegistry'
import 'styles/global/globals.css'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100%' }}>
        <ChakraProvider>
          <StyledComponentsRegistry>
            <Navigation />
            {children}
            <Footer />
          </StyledComponentsRegistry>
        </ChakraProvider>
      </body>
    </html>
  )
}
