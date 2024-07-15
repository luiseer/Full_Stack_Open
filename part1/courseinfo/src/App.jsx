const Header = (props) => {
 return <h1>{props.course}</h1>
}

const Content = ({part, exercises}) => {
 return  (
  <>
    <Part part={part} exercises={exercises}/>
  </>
)
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>
}

const Part = () => {
  return(
    <>
      <p>Fundamentals of React, exercises: 10</p>
      <p>Using props to pass data, exercises: 7</p>
      <p>State of a component, exercises: 14</p>
    </>
  )
}

const App = ({part}) => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
