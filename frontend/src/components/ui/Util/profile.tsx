import { Box, Text, VStack } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { BsPerson } from "react-icons/bs";

type ProfileProps = {
    name: string;
    Icon?: IconType;
    file: string;
    socket: WebSocket | null;
}

const Profile = ({ name, Icon = BsPerson, file, socket }: ProfileProps) => {
    const handleClick = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            console.log(`[LOG] Telling ${name} to download ${file}`);
            socket.send(JSON.stringify({
                type: "send_download",
                target: name,
                file_url: file
            }));
        } else {
            console.warn(`[WARNING] Socket is not open/connected.`)
        }
    };
    return (
        <>
            <Box onClick={handleClick}>
                <VStack spaceY={-2} p="2">
                    <Box
                        boxSize="64px"
                        bg="gray.100"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="gray.600"
                        fontSize="24px"
                    >
                        <Icon />
                    </Box>
                    <Text fontSize="sm">
                        {name}
                    </Text>
                </VStack>
            </Box>
        </>
    )
}

export default Profile