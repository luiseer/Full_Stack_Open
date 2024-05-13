import { useState } from "react"

const Display = ({counter}) => <div>{counter}</div>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

  

const App = () => {
  const [counter, setCounter] = useState(0) 
  console.log('Rendereing with counter value', counter);
  console.log();

  const incrementByOne = () => {
    setCounter(counter +1)
    console.log('increasing value in 1 before', counter);
  }
  const decrementByOne = () => {
    setCounter(counter -1)
    console.log('decreasing value in 1 before', counter);
  }
  const setZero = () => {
    setCounter(0)
    console.log('reseting to zero', counter);
  }

  return(
    <div>
      <Display counter={counter}/>

      <Button 
        onClick={incrementByOne}
        text='Plus'/>

      <Button 
        onClick={setZero}
        text='Set on Zero'/>

      <Button 
        onClick={decrementByOne}
        text='minus'/>
    </div>
  )
}

export default App