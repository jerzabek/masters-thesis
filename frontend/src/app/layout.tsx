import 'bootstrap/dist/css/bootstrap.css'

import StyledComponentsRegistry from './modules/ui/StyledComponentRegistry'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
