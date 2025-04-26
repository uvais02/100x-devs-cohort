import './App.css'
import {useEffect, useState} from "react";

function App() {
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('useEffect called')
        }, 10000);

        return () => clearInterval(interval);
    }, []);

  return (
    <>
        <p>Hi there</p>
    </>
  )
}

export default App
