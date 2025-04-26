import React, {useEffect} from "react";

const UseEffect = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('useEffect called')
        }, 10000);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <h1>UseEffect</h1>
            <p>Check the console to see the effect in action.</p>
        </>
    )
}

export default UseEffect;