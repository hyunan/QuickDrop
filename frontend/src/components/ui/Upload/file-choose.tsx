import { HStack, IconButton, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { LuUpload } from "react-icons/lu";

const FileChoose = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => inputRef.current?.click()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            onFileSelect(file)
        }
    }
    
    return (
        <>
            <Input
                type="file"
                hidden
                ref={inputRef}
                onChange={handleChange}
                accept="*/*"
            />
            <IconButton onClick={handleClick} size="md" _icon={{ w: 5, h: 5}}>
                <HStack p="2">
                    <LuUpload />
                    <Text>Upload</Text>
                </HStack>
            </IconButton>
        </>
    )
}

export default FileChoose