import { Box, Text, SimpleGrid } from "@chakra-ui/react"

import FileChoose from "./Upload/file-choose"
import Profile from "./Util/profile"

type UploadUIProps = {
  deviceName: string;
  devices: string[];
  socket: WebSocket | null;
}

const UploadUI = ({ deviceName, devices, socket }: UploadUIProps) => {
    return (
        <>
            <Text>UPLOADING SCREEN</Text>
            <FileChoose onFileSelect={(file) => {
                console.log(`Uploaded: ${file.name}. Total size: ${file.size} bytes.`);
                // Example: send file info over socket if needed
                // socket?.send(JSON.stringify({ type: "file", fileName: file.name, size: file.size }));
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
                        <Profile key={device} name={device} socket={socket} />
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default UploadUI