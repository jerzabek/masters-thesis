import { Logout, Menu, ShoppingCart, UserAvatar } from '@carbon/icons-react'
import { Box, Button, Collapse, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'

import { logout } from 'api/repository'
import { useCart } from 'components/Cart'
import { getCartCount } from 'components/Cart/utils'
import Link from 'components/Link'
import { USER_AVATAR_SIZE } from 'components/Navigation/const'

const MobileDropdownNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  const containerRef = useRef<HTMLDivElement>(null)

  const { cart } = useCart()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [containerRef, onClose, onToggle])

  const handleLogout = () => {
    logout()
      .then(() => {
        location.href = '/'
      })
      .catch(e => console.log(e))
  }

  const { user, isAuthenticated } = useUser()

  const cartCount = getCartCount(cart)

  return (
    <Flex direction="column" ref={containerRef}>
      <Flex align="center" py={2} px={4}>
        <NextLink href="/">
          <Flex align="center">
            <Box w={8} h={8} bg="gray.200" mr={4} />

            <Text fontWeight="bold" fontSize={32}>
              Pinehaus
            </Text>
          </Flex>
        </NextLink>

        <Flex ml="auto" mr={1} gap={2} align="center">
          <Link mr={4} href={isAuthenticated ? `/cart` : `/login`}>
            <Box position="relative">
              <ShoppingCart width={24} height={24} />
              {cartCount > 0 && (
                <Flex
                  justify="center"
                  align="center"
                  borderRadius="50%"
                  bg="green"
                  w="20px"
                  h="20px"
                  position="absolute"
                  top="12px"
                  left="12px"
                >
                  <Text color="white" fontSize={12}>
                    {cartCount}
                  </Text>
                </Flex>
              )}
            </Box>
          </Link>

          <Link href={isAuthenticated ? `/profile` : `/login`}>
            {user?.avatarUrl ? (
              <Box borderRadius="50%" border="1px solid" color="gray.800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl}
                  referrerPolicy="no-referrer"
                  alt="User avatar"
                  width={USER_AVATAR_SIZE}
                  height={USER_AVATAR_SIZE}
                  style={{ borderRadius: '50%' }}
                />
              </Box>
            ) : null}
          </Link>
        </Flex>

        <Button onClick={onToggle} variant="unshield">
          <Menu width={24} height={24} />
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box px="40px" py="20px" shadow="md" borderBottom="1px solid" borderBottomColor="gray.400">
          <Flex direction="column">
            <Link href={`/`} onClick={onClose}>
              <Text fontSize={20}>Home</Text>
            </Link>
            <Link href={`/products`} onClick={onClose}>
              <Text fontSize={20}>Products</Text>
            </Link>
            <Link href={`/about-us`} onClick={onClose}>
              <Text fontSize={20}>About</Text>
            </Link>
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="unshielded">
                <Box mr={4}>
                  <Logout width={20} height={20} />
                </Box>
                Sign out
              </Button>
            ) : (
              <Box w="100%" textAlign="center">
                <Link href={`/login`} onClick={onClose}>
                  <Button variant="unshielded">
                    <Box mr={4}>
                      <UserAvatar width={24} height={24} />
                    </Box>
                    Sign in
                  </Button>
                </Link>
              </Box>
            )}
          </Flex>
        </Box>
      </Collapse>
    </Flex>
  )
}

export default MobileDropdownNav
