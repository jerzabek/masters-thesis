import { Logout, Menu, UserAvatar } from '@carbon/icons-react'
import { Box, Button, Collapse, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'

import { logout } from 'api/repository'
import Link from 'components/Link'

const MobileDropdownNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  const containerRef = useRef<HTMLDivElement>(null)

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

        <Box ml="auto" mr={1}>
          <Link href={isAuthenticated ? `/profile` : `/login`}>
            {user?.avatarUrl ? (
              <Box borderRadius="50%" border="1px solid" color="gray.800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl}
                  referrerPolicy="no-referrer"
                  alt="User avatar"
                  width={48}
                  height={48}
                  style={{ borderRadius: '50%' }}
                />
              </Box>
            ) : null}
          </Link>
        </Box>

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
