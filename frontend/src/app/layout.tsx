import 'bootstrap/dist/css/bootstrap.css'

import dynamic from 'next/dynamic'
import StyledComponentsRegistry from './modules/ui/StyledComponentRegistry'

dynamic(() => require('bootstrap/dist/js/bootstrap.min.js'), { ssr: false })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
