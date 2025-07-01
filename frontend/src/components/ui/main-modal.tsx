import { Box, Text, VStack } from "@chakra-ui/react";
import TopBar from "./top-bar";

const MainModal = () => {
    return (
        <Box bg="white" h="500px" w="650px" borderRadius="12px" overflow="hidden">
            <VStack bg="blue" h="full">
                <TopBar />
                <Text>Hello</Text>
                <Text>World!</Text>
            </VStack>
        </Box>
    )
}

export default MainModal