import { Box, Text, VStack } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { BsPerson } from "react-icons/bs";

type ProfileProps = {
    name: string;
    Icon?: IconType;
}

const Profile = ({ name, Icon = BsPerson }: ProfileProps) => {
    const handleClick = () => {
        console.log(`Clicked on ${name}`);
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