import { IconButton } from "@chakra-ui/react";
import { LuGithub } from "react-icons/lu";

const GithubButton = () => {
    return (
        <a
        href="https://github.com/hyunan/QuickDrop"
        target="_blank"
        rel="noopener noreferrer"
        >
            <IconButton
                aria-label="Github Link"
                variant="ghost"
                size="sm"
                css={{
                    _icon: {
                        w: 5,
                        h: 5
                    }
                }}
            >
                <LuGithub />
            </IconButton>
        </a>
    )
}

export default GithubButton