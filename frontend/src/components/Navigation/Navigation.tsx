import { UserAvatar } from '@carbon/icons-react'
import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Link from 'components/Link'

export default function Navigation() {
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
        <Link href={`/login`} mr={12}>
          <UserAvatar width={32} height={32} />
        </Link>
      </Flex>
    </Grid>
  )
}
