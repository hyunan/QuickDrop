import { IconButton } from "@chakra-ui/react";
import { LuGithub } from "react-icons/lu";

const GithubButton = () => {
    return (
        <>
            <IconButton
                aria-label="Github Link"
                size="sm"
                color="black"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                css={{
                    _icon: {
                        w: 5,
                        h: 5
                    }
                }}
            >
                <a
                href="https://github.com/hyunan/QuickDrop"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <LuGithub />
                </a>
            </IconButton>
        </>
    )
}

export default GithubButton