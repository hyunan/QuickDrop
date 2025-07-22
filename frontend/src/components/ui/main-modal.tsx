import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";

import { GenerateDeviceName } from "./Util/generate-device-name"
import UploadUI from "./upload-ui";
import SenderUI from "./sender-ui";

const MainModal = () => {
    // Announce to server activity
    useEffect(() => {
        const announce = async () => {
            try {
                await axios.post(`http://0.0.0.0:8000/api/announce_${deviceName}`);
                console.log("Announced presense to server");
            } catch (e) {
                console.error("Failed to announce presense", e);
            }
        }

        announce();

        const interval = setInterval(announce, 3500);

        return () => clearInterval(interval);
    }, []);

    // Get client list
    useEffect(() => {
        const get_devices = async () => {
            try {
                let res = await axios.get("http://0.0.0.0:8000/api/clients");
                setDevices(res.data)
            } catch (e) {
                console.error("Failed to announce presense", e);
            }
        }

        get_devices();

        const interval = setInterval(get_devices, 1500);

        return () => clearInterval(interval);
    }, []);

    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [devices, setDevices] = useState([])
    const deviceName = useMemo(() => GenerateDeviceName(), [])
    console.log(`Name is ${deviceName}`)

    const handleFileUpload = useCallback((filename: string) => {
        setUploadedFileName(filename);
        console.log(`[handleFileUpload] Uploaded file's name is: ${filename}`);
    }, []);

    useEffect(() => {
        if (uploadedFileName) {
            console.log(`RECEIVED NAME: ${uploadedFileName}`);
        }
    }, [uploadedFileName]);

    return (
        <>
            <Flex direction={{ base: "column-reverse", md: "row" }} w="100%" h="100vh">
                <Box flexBasis={{ base: "40%", md: "30%" }} bg={"gray.100"}>
                    <UploadUI onFileUploaded={handleFileUpload} />
                </Box>
                <Box flexBasis={{ base: "60%", md: "70%" }} bg={"blue.300"}>
                    <SenderUI deviceName={deviceName} devices={devices} />
                </Box>
            </Flex>
        </>
    )
}

export default MainModal