import { Box, Flex, Text } from '@chakra-ui/react'
import { googleLoginRedirectRoute } from 'api/routes'
import Script from 'next/script'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

export default function LoginPage() {
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
            ></div>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
