import { Suspense } from 'react'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return <Suspense fallback={<>Loading product...</>}>{children}</Suspense>
}
