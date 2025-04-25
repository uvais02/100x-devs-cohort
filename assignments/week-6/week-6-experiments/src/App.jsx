import './App.css'

function App() {

  return (
    <>
      <Header title={'header1'}/>
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
