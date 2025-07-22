import { useCallback, useRef, useEffect, useMemo, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import QRCode from "react-qr-code";

import { GenerateDeviceName } from "./Util/generate-device-name"
import { talkToPeers } from "./Util/p2p";
import UploadUI from "./upload-ui";
import SenderUI from "./sender-ui";
import DownloadModal from "./download-popup-modal";
import GithubButton from "./Util/github-button";

const MainModal = () => {
    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [devices, setDevices] = useState<string[]>([]);
    const [downloadFileName, setDownloadFileName] = useState<string | null>(null);
    const [pendingDownload, setPendingDownload] = useState<string | null>(null);
    const deviceName = useMemo(() => GenerateDeviceName(), []);
    const socketRef = useRef<WebSocket | null>(null);
    const backendIp = import.meta.env.VITE_BACKEND_HOST;
    const backendURL = `http://${backendIp}/`;

    useEffect(() => {
        socketRef.current = talkToPeers(deviceName, setDevices, setDownloadFileName);
        return () => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current?.close();
            }
        };
    }, [deviceName]);

    useEffect(() => {
        if (downloadFileName) {
            console.log(`[DOWNLOAD] need to download file: ${downloadFileName}`)
            setPendingDownload(downloadFileName);
        }
    }, [downloadFileName]);

    const handleFileUpload = useCallback((filename: string) => {
        setUploadedFileName(filename);
        console.log(`[handleFileUpload] Uploaded file's name is: ${filename}`);
    }, []);

    return (
        <>
            <Flex direction={{ base: "column-reverse", md: "row" }} w="100%" h="100vh">
                <Box flexBasis={{ base: "40%", md: "30%" }} bg={"gray.300"}>
                    <UploadUI onFileUploaded={handleFileUpload} />
                    <Box
                        pos="absolute"
                        bottom="20px"
                        left="20px"
                        zIndex="5"
                        display={{ base: "none", md: "block" }}
                    >
                        <Text color="black" fontWeight="bolder" pb="10px">Open on another device!</Text>
                        <QRCode
                            size={128}
                            value={backendURL}
                        />
                        <Box mt="4">
                            <GithubButton />
                        </Box>
                    </Box>
                </Box>
                <Box flexBasis={{ base: "60%", md: "70%" }} bg={"gray.100"}>
                    <SenderUI 
                        deviceName={deviceName}
                        devices={devices}
                        fileName={uploadedFileName}
                        socket={socketRef.current}
                    />
                </Box>
            </Flex>
            {pendingDownload && (
                <DownloadModal fileName={pendingDownload} onClose={() => setPendingDownload(null)} />
            )}
        </>
    )
}

export default MainModal