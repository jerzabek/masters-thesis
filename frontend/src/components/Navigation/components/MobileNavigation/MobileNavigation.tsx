import React, { useState } from 'react'
import NextLink from 'next/link'
import { Box, Button, Flex, Text, useDisclosure, Collapse } from '@chakra-ui/react'
import Link from 'components/Link'
import { useUser } from 'hooks/authentication'
import { Menu, UserAvatar } from '@carbon/icons-react'

const MobileDropdownNav = () => {
  const { isOpen, onToggle } = useDisclosure()

  const { user } = useUser()

  return (
    <Flex direction="column">
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
          <Link href={`/login`}>
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="User avatar" width={48} height={48} style={{ borderRadius: '50%' }} />
            ) : (
              <UserAvatar width={48} height={48} />
            )}
          </Link>
        </Box>

        <Button onClick={onToggle} variant="unshield">
          <Menu />
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" shadow="md">
          <Flex direction="column">
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
        </Box>
      </Collapse>
    </Flex>
  )
}

export default MobileDropdownNav
