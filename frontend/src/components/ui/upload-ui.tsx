import { Box, Text, SimpleGrid } from "@chakra-ui/react"

import FileChoose from "./Upload/file-choose"
import Profile from "./Util/profile"

type UploadUIProps = {
  deviceName: string;
  devices: string[];
}

const UploadUI = ({ deviceName, devices }: UploadUIProps) => {
    return (
        <>
            <Text>UPLOADING SCREEN</Text>
            <FileChoose onFileSelect={(file) => {
                console.log(`Uploaded: ${file.name}. Total size: ${file.size} bytes.`);
            }} />
            <Text>Send to:</Text>
            <Box
                maxH="300px"
                overflowY="auto"
                w="full"
                px={2}
            >
                <SimpleGrid columns={[2, 6]}>
                    {devices
                    .filter((device) => device != deviceName)
                    .map((device) => (
                        <Profile name={device} key={device} />
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default UploadUI