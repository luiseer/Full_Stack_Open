import { useState } from "react"

const History = (props) => {
  if (props.leftOrRigthClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.leftOrRigthClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
  

const App = () => {

  const [clicks, setClicks] = useState(
    {
      left: 0,
      rigth: 0,
      totalClicks: 0,
      leftOrRigthClicks: [] 
    }
  )

  console.log(clicks);

  const handleLeftClick = () => {
    setClicks({
      ...clicks,
      totalClicks: clicks.totalClicks + 1,
      leftOrRigthClicks: clicks.leftOrRigthClicks.concat('L'),
      left: clicks.left + 1})
  }
  const handleRigthClick = () => {
    setClicks({
      ...clicks,
      totalClicks: clicks.totalClicks + 1,
      leftOrRigthClicks: clicks.leftOrRigthClicks.concat('R'),
      rigth: clicks.rigth + 1})
  }
  const handleClicks = () =>{
    setClicks({
      ...clicks,
      totalClicks: clicks.totalClicks +1
    })
  }
  return(
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRigthClick} text='right' />
      {clicks.rigth}
      {<div onClick={handleClicks}>total: {clicks.totalClicks}</div>}
      <History leftOrRigthClicks={clicks.leftOrRigthClicks}/>
      {/* <p>{clicks.leftOrRigthClicks.join(' ')}</p> */}
    </div>
  )
}

export default App