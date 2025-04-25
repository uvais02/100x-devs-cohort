import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <HeaderWithButton />
      <Header title={'header2'}/>
      <Header title={'header3'}/>
      <Header title={'header4'}/>
    </>
  )
}

function Header({title}) {
  return <div>
    {title}
  </div>
}

function HeaderWithButton() {
  const [firstHeaderState, setFirstHeaderState] = useState("header1")

  function handleClick() {
    setFirstHeaderState("header" + Math.random())
  }

  return <>
    <button onClick={handleClick}>click me to change the title</button>
    <Header title={firstHeaderState}/>
  </>
}

export default App
