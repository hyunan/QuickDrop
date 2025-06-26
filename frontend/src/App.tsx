import { useState } from 'react'
import { VStack, Center } from '@chakra-ui/react'
import MainModal from './components/ui/main-modal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VStack minH="100vh" >
        <Center w="full" flex="1">
          <MainModal />
        </Center>
      </VStack>
    </>
  )
}

export default App
