import { Box } from '@chakra-ui/react'

import 'styles/global/globals.css'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import Providers from 'components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', minHeight: '100%', flexDirection: 'column' }}>
        <Providers>
          <Navigation />
          <Box as="main" flex={1}>
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
