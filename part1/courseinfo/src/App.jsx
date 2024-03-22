
const Title = ({course}) => <h1>{course}</h1>

const Content = (props) =>{

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
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Title course={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

export default App
