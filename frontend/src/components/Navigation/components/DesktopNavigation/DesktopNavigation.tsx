import { Logout, ShoppingCart, UserAvatar } from '@carbon/icons-react'
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import NextLink from 'next/link'

import { logout } from 'api/repository'
import Link from 'components/Link'
import { USER_AVATAR_SIZE } from 'components/Navigation/const'

export default function DesktopNavigation() {
  const { user, isAuthenticated } = useUser()

  const handleLogout = () => {
    logout()
      .then(() => {
        location.href = '/'
      })
      .catch(e => console.log(e))
  }

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
        <Link href={`/about-us`}>
          <Text fontSize={20}>About</Text>
        </Link>
      </Flex>

      <Flex top={0} p="inherit" position="absolute" right={0} h="100%" align="center" gap={4}>
        <Link mr={4} href={isAuthenticated ? `/cart` : `/login`}>
          <ShoppingCart width={24} height={24} />
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
