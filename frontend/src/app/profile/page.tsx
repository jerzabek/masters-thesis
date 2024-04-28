'use client'

import { ChevronRight, Information } from '@carbon/icons-react'
import { Text } from '@chakra-ui/layout'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { updateUser } from 'api/User/repository'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'
import { FormikHelpers } from 'formik'
import { useUser } from 'hooks/authentication'
import { UserForm } from 'modules/Profile'
import { UserFormValues } from 'modules/Profile/UserForm/interface'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function ProfilePage() {
  const { user, isUserLoading, isAuthenticated } = useUser()

  const { close } = useToast()

  const showSavingToast = useSavingToast()
  const showSuccessToast = useSuccessToast()
  const showErrorToast = useErrorToast()

  if (isUserLoading) {
    return null
  }

  if (!isAuthenticated || !user) {
    redirect('/login')
  }

  const handleSubmit = (values: UserFormValues, formikHelpers: FormikHelpers<UserFormValues>) => {
    const toastId = showSavingToast()

    updateUser(user.id, values)
      .then(() => showSuccessToast())
      .catch(() => showErrorToast())
      .finally(() => {
        formikHelpers.setSubmitting(false)
        close(toastId)
      })
  }

  return (
    <>
      <Box w="100%" h="350px" position="relative">
        <Image
          src="/images/banners/profile-banner.jpg"
          alt="Profile page banner"
          sizes="100vw"
          style={{
            opacity: 0.3,
            zIndex: -1,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          fill
        />

        <Flex flexDir="column" justify="center" align="center" h="100%">
          <Text as="h1" textStyle="h1" color="black">
            Hello, {user.firstName}.
          </Text>

          <Breadcrumb spacing="8px" separator={<ChevronRight color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pinehaus</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
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
