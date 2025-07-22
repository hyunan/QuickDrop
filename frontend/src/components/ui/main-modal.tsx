import { useCallback, useRef, useEffect, useMemo, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { GenerateDeviceName } from "./Util/generate-device-name"
import { talkToPeers } from "./Util/p2p";
import UploadUI from "./upload-ui";
import SenderUI from "./sender-ui";

const MainModal = () => {
    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [devices, setDevices] = useState<string[]>([]);
    const [downloadFileName, setDownloadFileName] = useState<string>("");
    const deviceName = useMemo(() => GenerateDeviceName(), []);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = talkToPeers(deviceName, setDevices, setDownloadFileName);
        return () => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current?.close();
            }
        };
    }, [deviceName]);

    useEffect(() => {
        console.log(`[DOWNLOAD] need to download file: ${downloadFileName}`)
    }, [downloadFileName]);

    const handleFileUpload = useCallback((filename: string) => {
        setUploadedFileName(filename);
        console.log(`[handleFileUpload] Uploaded file's name is: ${filename}`);
    }, []);

    return (
        <>
            <Flex direction={{ base: "column-reverse", md: "row" }} w="100%" h="100vh">
                <Box flexBasis={{ base: "40%", md: "30%" }} bg={"gray.100"}>
                    <UploadUI onFileUploaded={handleFileUpload} />
                </Box>
                <Box flexBasis={{ base: "60%", md: "70%" }} bg={"blue.300"}>
                    <SenderUI 
                        deviceName={deviceName}
                        devices={devices}
                        fileName={uploadedFileName}
                        socket={socketRef.current}
                    />
                </Box>
            </Flex>
        </>
    )
}

export default MainModal