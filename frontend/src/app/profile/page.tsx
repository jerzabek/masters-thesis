'use client'

import { Information } from '@carbon/icons-react'
import { Text } from '@chakra-ui/layout'
import { Box, Container, Divider, Flex } from '@chakra-ui/react'
import { FormikHelpers } from 'formik'
import { useUser } from 'hooks/authentication'
import { UserForm } from 'modules/Profile'
import { UserFormValues } from 'modules/Profile/UserForm/interface'
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

  const handleSubmit = (values: UserFormValues, formikHelpers: FormikHelpers<UserFormValues>) => {
    console.log(values)
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

      <Container maxW="container.xl" py={16}>
        <Flex align="center" gap={4} mb={1}>
          <Information width={24} height={24} />

          <Text as="h2" textStyle="h2">
            Your information
          </Text>
        </Flex>

        <Divider mb={4} />

        <UserForm user={user} handleSubmit={handleSubmit} />
      </Container>
    </>
  )
}
