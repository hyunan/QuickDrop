import { VStack, Center } from '@chakra-ui/react'
import MainModal from './components/ui/main-modal'

function App() {
  return (
    <>
      <VStack minH="100vh" bg="gray.400">
        <Center w="full" flex="1">
          <MainModal />
        </Center>
      </VStack>
    </>
  )
}

export default App
