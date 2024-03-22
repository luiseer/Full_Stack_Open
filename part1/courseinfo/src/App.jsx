
const Title = ({course}) => <h1>{course}</h1>

const Content = (props) =>{
  console.log(props)
  return(
    <div>
      <p> Name {props.name} exercises {props.exercises}
      </p>
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


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Title course={course}/>
      <Content name={part1.name} exercises={part1.exercises}/>
      <Content name={part2.name} exercises={part2.exercises}/>
      <Content name={part3.name} exercises={part3.exercises}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App
