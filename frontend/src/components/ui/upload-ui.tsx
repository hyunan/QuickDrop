import { Box, Text, SimpleGrid, Button } from "@chakra-ui/react"

import FileChoose from "./Upload/file-choose"
import Profile from "./Util/profile"

const UploadUI = () => {
    const devices = Array.from({ length: 4 }, (_, i) => `Device ${i + 1}`);

    return (
        <>
            <Text>UPLOADING SCREEN</Text>
            <FileChoose onFileSelect={(file) => console.log(`Uploaded: ${file.name}. Total size: ${file.size} bytes.`)}></FileChoose>
            <Text>Send to:</Text>
            <Box
                maxH="300px"
                overflowY="auto"
                w="full"
                px={2}
                >
                <SimpleGrid columns={[2, 6]}>
                    {devices.map((device, idx) => (
                        <Profile name={device} key={idx}></Profile>
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default UploadUI