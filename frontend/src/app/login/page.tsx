'use client'

import { Box, Flex, Text } from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import { redirect } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

import { googleLoginRedirectRoute } from 'api/routes'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
  }
}

export default function LoginPage() {
  const { isUserLoading, isAuthenticated } = useUser()

  const g_sso = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.google) return

    window.google.accounts.id.renderButton(g_sso.current, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: '400',
    })
  }, [])

  if (isUserLoading) {
    return null
  }

  if (isAuthenticated) {
    redirect('/profile')
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <Flex h="100%" justify="center" align="center">
        <Flex
          direction="column"
          justify="center"
          align="center"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="lg"
          minW="400px"
          py={4}
          px={3}
        >
          <Text fontWeight={800} fontSize={32} mb={4}>
            Sign in!
          </Text>

          <Box w={400} h={8}>
            <div
              id="g_id_onload"
              data-client_id={GOOGLE_CLIENT_ID}
              data-context="signin"
              data-ux_mode="redirect"
              data-login_uri={googleLoginRedirectRoute()}
              data-itp_support="true"
            ></div>

            <div
              className="g_id_signin"
              data-type="standard"
              data-shape="rectangular"
              data-theme="outline"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left"
              data-width="400"
              ref={g_sso}
            ></div>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
