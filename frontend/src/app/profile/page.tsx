'use client'

import { Text } from '@chakra-ui/layout'
import { Box, Container, Divider, Flex } from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function ProfilePage() {
  const { user, isUserLoading, isAuthenticated } = useUser()

  if (isUserLoading) {
    return null
  }

  if (!isAuthenticated || !user) {
    redirect('/login')
  }

  return (
    <>
      <Box w="100%" h="350px" position="relative">
        <Image
          src="/images/banners/profile-banner.jpg"
          alt="Profile page banner"
          objectFit="cover"
          objectPosition="center"
          sizes="100vw"
          style={{
            opacity: 0.3,
            zIndex: -1,
          }}
          fill
        />

        <Flex justify="center" align="center" h="100%">
          <Text as="h1" textStyle="h1" color="black">
            Hello, {user.firstName}.
          </Text>
        </Flex>
      </Box>
    </>
  )
}
