import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListUser from './ListUser'
import Crud from './Crud'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Crud/>
      {/* <ListUser /> */}
    </>
  )
}

export default App
