import { useState } from 'react'
import './App.css'
import Name from './Name.jsx'
import Address from './Address.jsx'
import Input from './Input.jsx'

function App() {
  const [address , setAddress] = useState({})
  return (
    <>
      <h1>Welcome!</h1>
      <Name first='Jack' last='Sparrow'/>
      <Address street={address.street} city={address.city} states={address.states} zip={address.zip} />
      <Input onSave={setAddress}/>

    </>
  )
}

export default App
