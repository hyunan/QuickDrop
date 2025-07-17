import { useMemo, useState, useEffect, useRef } from "react";
import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";

import TopBar from "./top-bar";
import UploadUI from "./upload-ui";
import ReceiveUI from "./receive-ui";
import ViewToggle from "./Util/view-toggle";
import { GenerateDeviceName } from "./Util/generate-device-name"
import { connectToSignaling } from "./Util/signaling"

const MainModal = () => {    
    const [mode, setMode] = useState<"upload" | "receive">("upload")
    const deviceName = useMemo(() => GenerateDeviceName(), [])
    const [devices, setDevices] = useState<string[]>([]);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = connectToSignaling(deviceName, setDevices);
        return () => {
            socketRef.current?.close();
        };
    }, [deviceName]);

    return (
        <Box
            bg="white"
            h="550px"
            w="700px"
            borderRadius="12px"
            overflow="hidden"
        >
            <VStack bg="blue" h="full">
                <TopBar deviceName={deviceName} />
                <Flex w="100%" pr="2">
                    <Spacer />
                    <ViewToggle mode={mode} setMode={setMode} />
                </Flex>
                {mode === "upload" 
                    ? <UploadUI deviceName={deviceName} devices={devices} socket={socketRef.current} /> 
                    : <ReceiveUI />}
            </VStack>
        </Box>
    )
}

export default MainModal