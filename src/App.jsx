import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './assets/Navbar'
import Todo from './Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Todo/>
    </>
  )
}

export default App
