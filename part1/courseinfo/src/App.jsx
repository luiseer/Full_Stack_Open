
const Title = ({course}) => <h1>{course}</h1>

const Content = (props) =>{
  return(
    <div>
      <p>{props.part} exercises {props.exercises}</p>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Title course={course}/>
      <Content 
        part={part1} 
        exercises={exercises1}
        />
      <Content 
        part={part2}
        exercises={exercises2}
        />
      <Content 
        part={part3}
        exercises={exercises3}
        />
      
      <Total
        total={exercises1+exercises2+exercises3}
        />
    </div>
  )
}

export default App
