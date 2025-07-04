import { Box, Text, VStack } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { BsPersonPlus } from "react-icons/bs";

type ProfileProps = {
    name: string;
    Icon?: IconType
}

const Profile = ({ name, Icon = BsPersonPlus }: ProfileProps) => {
    return (
        <>
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
        </>
    )
}

export default Profile