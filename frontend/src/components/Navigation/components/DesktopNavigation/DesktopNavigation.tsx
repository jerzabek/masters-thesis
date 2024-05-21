import { Logout, ShoppingCart, UserAvatar } from '@carbon/icons-react'
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import NextLink from 'next/link'

import { logout } from 'api/repository'
import { useCart } from 'components/Cart'
import { getCartCount } from 'components/Cart/utils'
import Link from 'components/Link'
import { USER_AVATAR_SIZE } from 'components/Navigation/const'

export default function DesktopNavigation() {
  const { user, isAuthenticated } = useUser()

  const { cart } = useCart()

  const handleLogout = () => {
    logout()
      .then(() => {
        location.href = '/'
      })
      .catch(e => console.log(e))
  }

  const cartCount = getCartCount(cart)

  return (
    <Grid px={12} py={4} position="relative" templateColumns="repeat(3, 1fr)">
      <NextLink href={`/`}>
        <Flex align="center">
          <Box w={8} h={8} bg="gray.200" mr={4} />

          <Text fontWeight="bold" fontSize={32}>
            Pinehaus
          </Text>
        </Flex>
      </NextLink>

      <Flex
        top={0}
        p="inherit"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        h="100%"
        align="center"
        gap={10}
      >
        <Link href={`/`}>
          <Text fontSize={20}>Home</Text>
        </Link>
        <Link href={`/products`}>
          <Text fontSize={20}>Products</Text>
        </Link>
      </Flex>

      <Flex top={0} p="inherit" position="absolute" right={0} h="100%" align="center" gap={4}>
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
          ) : (
            <UserAvatar width={USER_AVATAR_SIZE} height={USER_AVATAR_SIZE} />
          )}
        </Link>

        {isAuthenticated && (
          <Button onClick={handleLogout} variant="ghost">
            <Logout width={24} height={24} />
          </Button>
        )}
      </Flex>
    </Grid>
  )
}
