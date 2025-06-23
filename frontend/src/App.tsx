import { useState } from 'react'

import Demo from './components/test/demo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Demo></Demo>
    </>
  )
}

export default App
