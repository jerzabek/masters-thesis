import { Flex, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <main>
      <Flex h="100%" justify="center" align="center">
        <Text as="h1" fontSize="2.5em">
          Hello world
        </Text>
      </Flex>
    </main>
  )
}
