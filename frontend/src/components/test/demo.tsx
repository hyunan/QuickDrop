import { Button, HStack, Spacer } from "@chakra-ui/react"

const Demo = () => {
    return (
        <HStack>
            <Button onClick={() => {console.log("BUTTON PRESSED")}}>Click me</Button>
            <Spacer />
            <Button>Click me</Button>
        </HStack>
    )
}

export default Demo