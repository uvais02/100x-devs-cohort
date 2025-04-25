import { useState } from 'react'
import './App.css'

function App() {
  const [firstHeaderState, setFirstHeaderState] = useState("header1")

  function handleClick() {
    setFirstHeaderState("header" + Math.random())
  }

  return (
    <>
    <button onClick={handleClick}>click me to change the title</button>
      <Header title={firstHeaderState}/>
      <Header title={'header2'}/>
    </>
  )
}

function Header({title}) {
  return <div>
    {title}
  </div>
}

export default App
