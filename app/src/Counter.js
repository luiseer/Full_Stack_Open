import React, { useState } from 'react'

const Counter = () => {

    const [counter, setCounter] = useState(0);

    const incraseByOne = () => setCounter(counter + 1)
    const decraseByOne = () => setCounter(counter - 1)
    const reset = () => setCounter(0)

    console.log('redering..', counter);


    return (
        <div>
            <h1>Counter</h1>
            <p>{counter}</p>
            <button onClick={incraseByOne}>plus</button>
            <button onClick={reset}>reset</button>
            <button onClick={decraseByOne}>minus</button>
        </div>
    )
}

export default Counter