import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { LuUpload } from "react-icons/lu";

const UploadUI = ({ onFileUploaded } : { onFileUploaded : (filename: string) => void}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        console.log(`Uploaded: ${file.name}. Total size: ${file.size} bytes.`);
        onFileUploaded(file.name)
    }, [onFileUploaded])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
    });

    return (
        <>
            <Text>UPLOADING SCREEN</Text>
            <Flex alignItems="center" justifyContent="center" w="100%">
            <Box
                {...getRootProps()}
                border="2px dashed #212121"
                bg="gray.200"
                color="black"
                borderRadius="4px"
                textAlign="center"
                cursor="pointer"
                h={{ base: "250px", md: "300px" }}
                w={{ base: "80%", md: "80%" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                <VStack>
                    <LuUpload />
                    <Text>Drop a file here ...</Text>
                </VStack>
                ) : (
                <VStack>
                    <LuUpload />
                    <Text>Drag and Drop or Select File...</Text>
                </VStack>
                )}
            </Box>
            </Flex>
            <Text>Send to:</Text>
            <Box
                maxH="300px"
                overflowY="auto"
                w="full"
                px={2}
            >
            </Box>
        </>
    )
}

export default UploadUI