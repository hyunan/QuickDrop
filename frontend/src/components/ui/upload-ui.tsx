import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { LuUpload } from "react-icons/lu";
import axios from "axios";


const UploadUI = ({ onFileUploaded } : { onFileUploaded : (filename: string) => void}) => {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        const backendIp = import.meta.env.VITE_BACKEND_HOST;

        try {
            const response = await axios.post(`http://${backendIp}/api/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            console.log(response.data);
            onFileUploaded(response.data.filename)
        } catch (err) {
            console.error(err)
        }
    }, [onFileUploaded])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
    });

    return (
        <>
            <Flex alignItems="center" justifyContent="center" w="100%" pt="20px">
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
        </>
    )
}

export default UploadUI