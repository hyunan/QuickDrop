import { VStack } from '@chakra-ui/react'
import DownloadModal from './components/ui/download-popup-modal'
// import MainModal from './components/ui/main-modal'

function App() {
  return (
    <>
      <VStack minH="100vh">
        <DownloadModal fileName='hello.png' onClose={() => {console.log("hello")}} />
      </VStack>
    </>
  )
}

export default App
