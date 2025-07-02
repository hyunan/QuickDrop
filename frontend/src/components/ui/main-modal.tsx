import { useState } from "react";
import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";

import TopBar from "./top-bar";
import UploadUI from "./upload-ui";
import ReceiveUI from "./receive-ui";
import ViewToggle from "./Util/view-toggle";

const MainModal = () => {
    const [mode, setMode] = useState<"upload" | "receive">("upload")

    return (
        <Box
            bg="white"
            h="500px"
            w="650px"
            borderRadius="12px"
            overflow="hidden"
        >
            <VStack bg="blue" h="full">
                <TopBar />
                <Flex w="100%" pr="2">
                    <Spacer />
                    <ViewToggle mode={mode} setMode={setMode} />
                </Flex>
                {mode === "upload" ? <UploadUI /> : <ReceiveUI />}
            </VStack>
        </Box>
    )
}

export default MainModal