import { Text } from "@chakra-ui/react"

import FileChoose from "./Upload/file-choose"

const UploadUI = () => {
    return (
        <>
            <Text>UPLOADING!</Text>
            <FileChoose onFileSelect={(file) => console.log(file.name)}></FileChoose>
        </>
    )
}

export default UploadUI