import { Box, Text, VStack } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { BsPerson } from "react-icons/bs";

type ProfileProps = {
    name: string;
    Icon?: IconType;
    socket: WebSocket | null;
}

const Profile = ({ name, Icon = BsPerson, socket }: ProfileProps) => {
    const handleClick = async () => {
        if (!socket) return;

        console.log(`Initiating connection to ${name}`);
        const peer = new RTCPeerConnection()
        const channel = peer.createDataChannel("file");

        channel.onopen = () => {
            console.log("Data channel is open!");
        };

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer)

        socket?.send(JSON.stringify({
            type: "signal",
            target: name,
            payload: {
                "type": "offer",
                "sdp": offer.sdp
            }
        }));
    }

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