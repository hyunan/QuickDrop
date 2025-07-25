import { Box, SimpleGrid } from "@chakra-ui/react"

import Profile from "./Util/profile"

type UploadUIProps = {
  deviceName: string;
  devices: string[];
  fileName: string;
  socket: WebSocket | null;
}    

const SenderUI = ({ deviceName, devices, fileName, socket }: UploadUIProps) => {
    return (
        <>
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
                        <Profile name={device} key={device} file={fileName} socket={socket} />
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default SenderUI