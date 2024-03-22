
const Title = ({course}) => <h1>{course}</h1>

const Content = (props) =>{
  const totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0);
  console.log(props)
  return(
    <div>
      <ul>
        {props.parts.map((part, index) =>(
          <li key={index}>
            {part.name} - {part.exercises}
          </li>
        ))}
      </ul>
      <p>Total exercises: {totalExercises}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Title course={course}/>
      <Content parts={parts}/>
    </div>
  )
}

export default App
