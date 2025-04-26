import './App.css'
import {useEffect} from "react";

function App() {
    useEffect(() => {
        alert('useEffect called')
    }, []);

  return (
    <>
        <p>Hi there</p>
    </>
  )
}

export default App
