import { useState } from "react"
  

const App = () => {

  const [clicks, setClicks] = useState(
    {left: 0,
      rigth: 0
    }
  )

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
    }
    setClicks(newClicks)
  }
  const handleRigthClick = () => {
    const newClicks = {
      ...clicks,
      rigth: clicks.rigth +1
    }
    setClicks(newClicks)
  }
  return(
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRigthClick}>rigth</button>
      {clicks.rigth}
    </div>
  )
}

export default App