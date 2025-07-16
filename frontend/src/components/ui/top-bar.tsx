import { Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import GithubButton from "./Util/github-button";

type TopBarProps = {
  deviceName: string;
}

const TopBar = ({ deviceName }: TopBarProps) => {
    return (
        <Flex w="100%" p="2" bg="pink.600">
          <VStack pl="1" align="start">
            <Text fontSize="md">Device Name</Text>
            <Text fontSize="sm">{deviceName}</Text>
          </VStack>
          <Spacer />
          <GithubButton />
        </Flex>
    )
}

export default TopBar