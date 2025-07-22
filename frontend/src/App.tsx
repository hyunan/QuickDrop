import { VStack } from '@chakra-ui/react'
import MainModal from './components/ui/main-modal'

function App() {
  return (
    <>
      <VStack minH="100vh">
        {/*<DownloadModal fileName='hello.png' onClose={() => {console.log("hello")}} />*/}
        <MainModal />
      </VStack>
    </>
  )
}

export default App
