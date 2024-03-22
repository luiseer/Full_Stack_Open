
const Title = ({course}) => <h1>{course}</h1>

const Content = (props) =>{
  return(
    <div>
      <Part/>
      <Part/>
      <Part/>
    </div>
  )
}

const Total = (props) =>{
  return (
    <div>
      <p>Number of excercises {props.total}</p>
    </div>
  )
}

const Part = (props) =>{
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  return(
    <div>
      <p>{part1} and {exercises1}</p>
    </div>
  )
}

const App = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const course = 'Half Stack application development'
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Content/>
    </div>
  )
}

export default App
