'use client'

import { useMediaQuery } from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import { DesktopNavigation, MobileNavigation } from './components'

export default function Navigation() {
  const [isMobile] = useMediaQuery('(max-width: 800px)')

  if (isMobile) return <MobileNavigation />

  return <DesktopNavigation />
}
