import { LinkProps, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'

export default function LinkComponent({ href, children, ...rest }: LinkProps) {
  return (
    <ChakraLink as={Link} href={href} {...rest}>
      {children}
    </ChakraLink>
  )
}
