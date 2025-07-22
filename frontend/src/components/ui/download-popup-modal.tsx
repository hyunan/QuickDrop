import { Box, Flex, Text, Button, Image, useDisclosure } from "@chakra-ui/react";
import { FaFilePdf, FaFileArchive, FaFileAudio, FaFileVideo, FaFile } from "react-icons/fa";

const DownloadModal = ({fileName, onClose}: {
    fileName: string;
    onClose: () => void;
}) => {
    if (!fileName) return null;
    const backendIp = import.meta.env.VITE_BACKEND_HOST;
    const fileURL = `http://${backendIp}/api/download/${encodeURIComponent(fileName)}`;
    const ext = fileName.split('.').pop()?.toLowerCase();

    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = fileName;
        a.click();
        onClose();
    };

    return (
        <>
            <Box>
                Hello World!
                <Text>{fileURL}</Text>
                <Text>{ext}</Text>
            </Box>
        </>
    )
}

export default DownloadModal