import { Flex, ButtonGroup, Button, Spacer } from "@chakra-ui/react"

interface ViewToggleProps {
    mode: "upload" | "receive"
    setMode: (mode: "upload" | "receive") => void
}

const ViewToggle = ({mode, setMode }: ViewToggleProps) => {
    return (
        <>
            <Flex w="100%">
                <Spacer />
                <ButtonGroup size="sm" attached>
                    <Button
                        rounded="2xl"
                        variant={mode === "upload" ? "solid" : "ghost"}
                        onClick={() => {
                            setMode("upload")
                        }}
                        
                    >
                    Upload
                    </Button>
                    <Button
                        rounded="2xl"
                        variant={mode === "receive" ? "solid" : "ghost"}
                        onClick={() => {
                            setMode("receive")
                        }}
                        >
                    Receive
                    </Button>
                </ButtonGroup>
            </Flex>
        </>
    )
}

export default ViewToggle