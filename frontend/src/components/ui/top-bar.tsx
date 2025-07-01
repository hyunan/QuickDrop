import { Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import GithubButton from "./github-button";

const TopBar = () => {
    return (
        <Flex w="100%" p="2" bg="pink.600">
          <VStack pl="1">
            <Text fontSize="md">Device Name</Text>
            <Text fontSize="sm">TempName</Text>
          </VStack>
          <Spacer />
          <GithubButton />
        </Flex>
    )
}

export default TopBar