import { Box, Text, VStack } from "@chakra-ui/react";
import TopBar from "./top-bar";

const MainModal = () => {
    return (
        <Box bg="white" h="400px" w="600px">
            <VStack bg="blue">
                <TopBar />
                <Text>Hello</Text>
                <Text>World!</Text>
            </VStack>
        </Box>
    )
}

export default MainModal