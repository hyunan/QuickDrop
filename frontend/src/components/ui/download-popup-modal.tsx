import { Box, Flex, Text, Button, Image, HStack } from "@chakra-ui/react";
import { FaFilePdf, FaFileArchive, FaFileAudio, FaFileVideo, FaFile } from "react-icons/fa";
import axios from "axios";

const DownloadModal = ({fileName, onClose}: {
    fileName: string;
    onClose: () => void;
}) => {
    if (!fileName) return null;
    const backendIp = import.meta.env.VITE_BACKEND_HOST;
    const fileURL = `http://${backendIp}/api/download/${encodeURIComponent(fileName)}`;
    const viewURL = `http://${backendIp}/api/viewfile/${encodeURIComponent(fileName)}`;
    const ext = fileName.split('.').pop()?.toLowerCase();

    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = fileName;
        a.click();
        onClose();
    };

    const cancelDownload = async () => {
        await axios.delete(`http://${backendIp}/api/delete/${encodeURIComponent(fileName)}`)
        console.log("[LOG] Canceled and deleted download")
        onClose();
    };

    const getFileIcon = () => {
        switch(ext) {
            case 'pdf': return <FaFilePdf size={64} color="#e53e3e" />;
            case 'zip': return <FaFileArchive size={64} color="#805ad5" />;
            case 'mp3': return <FaFileAudio size={64} color="#3182ce" />;
            case 'mp4': return <FaFileVideo size={64} color="#38a169" />;
            default: return <FaFile size={64} />;
        }
    };

    return (
        <>
            <Box
                pos="absolute"
                bg="whiteAlpha.700"
                color="black"
                top="0"
                left="0"
                w="100%"
                h="100%"
                zIndex="5"
            >
                <Flex
                    w="100%"
                    h="100%"
                    align="center"
                    justify="center"
                    p="4"
                >
                    <Box
                        bg="white"
                        borderRadius="md"
                        p="6"
                        w={{ base: "250px", md: "400px"}}
                        textAlign="center"
                        shadow="lg"
                    >
                        <Text fontSize="xl" fontWeight="bold">📁 Incoming File</Text>
                        <Text my={2} fontWeight="bold">{fileName}</Text>
                        {ext?.match(/(jpg|jpeg|png|gif)/i) && (
                            <Image src={viewURL} alt="preview" maxH="200px" mx="auto" my={2} borderRadius="md" />
                        )}
                        {!ext?.match(/(jpg|jpeg|png|gif)/i) && (
                            <Box my={4}>{getFileIcon()}</Box>
                        )}
                        <HStack justifyContent="center" mt={4}>
                            <Button
                                onClick={cancelDownload}
                                _hover={{ bg: "gray.200" }}
                                borderRadius="md"
                            >
                                Cancel & Delete
                            </Button>
                            <Button
                                onClick={handleDownload}
                                _hover={{ bg: "gray.200" }}
                                borderRadius="md"
                            >
                                Download
                            </Button>
                        </HStack>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default DownloadModal