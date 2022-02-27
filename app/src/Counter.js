import React, { useState } from 'react'

const Counter = () => {

    const [counter, setCounter] = useState(0);

    console.log('redering..', counter);


    return (
        <div>
            <h1>Counter</h1>
            <p>{counter}</p>
            <button onClick={() => setCounter(counter + 1)}>plus</button>
            <button onClick={() => setCounter(0)}>reset</button>
            <button onClick={() => setCounter(counter - 1)}>minus</button>
        </div>
    )
}

export default Counter