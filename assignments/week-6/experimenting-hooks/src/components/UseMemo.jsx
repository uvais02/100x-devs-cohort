import React, {useMemo, useState} from "react";

const UseMemo = ()  => {

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
            <h1>UseMemo</h1>
            <input onChange={(e) => setValue(e.target.value)}/>
            <p>Sum from 1 to {value} is {sum}</p>
            <button onClick={incrementCount}>Counter {count}</button>
        </>
    )

}

export default UseMemo;