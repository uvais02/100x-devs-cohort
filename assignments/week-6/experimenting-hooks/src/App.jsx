import './App.css'
import {useEffect, useMemo, useState} from "react";

function App() {
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('useEffect called')
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const [value, setValue] = useState(0);
    const [count, setCount] = useState(0);

    function incrementCount() {
        setCount(count + 1)
    }

    const sum = useMemo(() => {
        let sum = 0;
        for (let i = 0; i <= value; i++) {
            sum += i;
        }
        return sum;
    }, [value]);

    return (
        <>
            <input onChange={(e) => setValue(e.target.value)}/>
            <p>Sum from 1 to {value} is {sum}</p>
            <button onClick={incrementCount}>Counter {count}</button>
        </>
    )
}

export default App
